#!/usr/bin/env node
/**
 * Corre PageSpeed solo sobre los sitios propios de data/auditoria.csv.
 *
 * Antes de correrlo, habilita "PageSpeed Insights API" en el mismo proyecto
 * de Google Cloud donde habilitaste Places. Sin key, Google te corta con
 * HTTP 429 — que es exactamente lo que pasó en la primera corrida.
 *
 * Uso:
 *   node --env-file=.env scripts/psi.mjs
 *
 * Reescribe data/auditoria.csv con las columnas pagespeed, lcp_seg y error_psi
 * llenas. Solo cachea resultados exitosos, así que reintenta los que fallaron.
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const KEY = process.env.GOOGLE_PLACES_API_KEY; // sirve la misma
const CSV = "data/auditoria.csv";
const CACHE = "data/psi-cache.json";

/* Dominios que Google reporta como sitio web pero no lo son */
const NO_ES_SITIO = [
  "facebook.com", "instagram.com", "linktr.ee", "wa.me", "wixsite.com",
  "business.site", "negocio.site", "blogspot.com", "amarillasinternet.com",
  "simplesite.com", "webnode.es", "webnode.com",
];

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

const esSitioPropio = (url) => {
  if (!url || url === "ninguna") return false;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return !NO_ES_SITIO.some((d) => host.endsWith(d) || host === d);
  } catch {
    return false;
  }
};

/* ---------- CSV mínimo, respeta comillas ---------- */

function parseCsv(texto) {
  const filas = [];
  let campo = "", fila = [], enComillas = false;
  const t = texto.replace(/^\uFEFF/, "");

  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (enComillas) {
      if (c === '"' && t[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') enComillas = false;
      else campo += c;
    } else if (c === '"') enComillas = true;
    else if (c === ",") { fila.push(campo); campo = ""; }
    else if (c === "\n") { fila.push(campo); filas.push(fila); fila = []; campo = ""; }
    else if (c !== "\r") campo += c;
  }
  if (campo || fila.length) { fila.push(campo); filas.push(fila); }

  const [cab, ...resto] = filas;
  return resto
    .filter((f) => f.length === cab.length)
    .map((f) => Object.fromEntries(cab.map((c, i) => [c, f[i]])));
}

const escapar = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/* ---------- PageSpeed ---------- */

async function medir(url, intento = 1) {
  const e = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  e.searchParams.set("url", url);
  e.searchParams.set("strategy", "mobile");
  e.searchParams.set("category", "performance");
  if (KEY) e.searchParams.set("key", KEY);

  try {
    const res = await fetch(e, { signal: AbortSignal.timeout(90000) });
    if (res.status === 429) throw new Error("429 rate limit");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const lh = data.lighthouseResult;
    const score = lh?.categories?.performance?.score;
    if (score == null) throw new Error("sin puntuación");

    const lcp = lh?.audits?.["largest-contentful-paint"]?.numericValue;
    return { score: Math.round(score * 100), lcp: lcp ? +(lcp / 1000).toFixed(1) : null };
  } catch (err) {
    if (intento < 4) {
      await dormir(4000 * intento); // espera creciente
      return medir(url, intento + 1);
    }
    return { error: err.message.slice(0, 50) };
  }
}

/* ---------- Principal ---------- */

async function main() {
  if (!KEY) console.warn("Sin API key: es muy probable que Google te corte con 429.\n");

  const filas = parseCsv(await readFile(CSV, "utf8"));
  const cache = existsSync(CACHE) ? JSON.parse(await readFile(CACHE, "utf8")) : {};

  const objetivo = [...new Set(filas.map((f) => f.web).filter(esSitioPropio))];
  console.log(`${objetivo.length} sitios propios que medir.\n`);

  for (const [i, url] of objetivo.entries()) {
    if (cache[url]?.score != null) {
      console.log(`[${i + 1}/${objetivo.length}] ${url} — en cache`);
      continue;
    }

    process.stdout.write(`[${i + 1}/${objetivo.length}] ${url} ... `);
    const r = await medir(url);
    console.log(r.error ? `falló: ${r.error}` : `${r.score}/100 · LCP ${r.lcp}s`);

    if (r.score != null) {                    // solo cachea lo exitoso
      cache[url] = r;
      await writeFile(CACHE, JSON.stringify(cache, null, 2));
    }
    await dormir(2500);
  }

  /* Escribe de vuelta */
  for (const f of filas) {
    const r = cache[f.web];
    f.pagespeed = r?.score ?? "";
    f.lcp_seg = r?.lcp ?? "";
    f.error_psi = esSitioPropio(f.web) && !r ? "sin medir" : "";
    f.tipo_web = !f.web || f.web === "ninguna"
      ? "ninguna"
      : esSitioPropio(f.web) ? "propia" : "solo_redes";
  }

  const cab = [...Object.keys(filas[0])];
  const salida = [cab.join(",")];
  for (const f of filas) salida.push(cab.map((c) => escapar(f[c])).join(","));
  await writeFile(CSV, "\uFEFF" + salida.join("\n"), "utf8");

  /* Resumen */
  const medidos = Object.values(cache).filter((r) => r.score != null);
  const prom = (k) => medidos.length
    ? +(medidos.reduce((s, r) => s + r[k], 0) / medidos.length).toFixed(1) : 0;

  const gye = filas.filter((f) => f.direccion.includes("Guayaquil"));
  const cuenta = (t) => gye.filter((f) => f.tipo_web === t).length;

  console.log("\n─────────── GUAYAQUIL ───────────");
  console.log(`Total veterinarias:      ${gye.length}`);
  console.log(`Sin nada:                ${cuenta("ninguna")}`);
  console.log(`Solo redes sociales:     ${cuenta("solo_redes")}`);
  console.log(`Con sitio propio:        ${cuenta("propia")}`);
  console.log(`Sin sitio propio:        ${gye.length - cuenta("propia")}`);
  console.log(`\nDe los que sí tienen sitio:`);
  console.log(`  PageSpeed móvil:       ${prom("score")}/100`);
  console.log(`  Carga (LCP):           ${prom("lcp")}s`);
}

main().catch((e) => { console.error(e); process.exit(1); });
