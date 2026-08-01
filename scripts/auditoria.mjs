#!/usr/bin/env node
/**
 * Auditoría de veterinarias en Guayaquil.
 *
 * Uso:
 *   node --env-file=.env scripts/auditoria.mjs
 *
 * Requiere en .env:
 *   GOOGLE_PLACES_API_KEY=...
 *
 * Genera:
 *   data/auditoria-cache.json   estado, permite reanudar si se corta
 *   data/auditoria.csv          lo que abres en la hoja de cálculo
 *
 * Nota: PageSpeed Insights no necesita key para volumen bajo, pero va lento
 * (10 a 30 segundos por sitio). El script guarda cada resultado apenas lo
 * obtiene, así que si lo cortas y lo vuelves a correr, no repite trabajo.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error("Falta GOOGLE_PLACES_API_KEY en .env");
  process.exit(1);
}

const CACHE = "data/auditoria-cache.json";
const CSV = "data/auditoria.csv";

/* Varias consultas para no depender del ranking de una sola.
   Ajusta los sectores según los que quieras cubrir. */
const CONSULTAS = [
  "veterinaria en Guayaquil",
  "clínica veterinaria Guayaquil",
  "hospital veterinario Guayaquil",
  "veterinaria norte de Guayaquil",
  "veterinaria sur de Guayaquil",
  "veterinaria Urdesa Guayaquil",
  "veterinaria Alborada Guayaquil",
  "veterinaria Samborondón",
];

const CAMPOS = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "places.googleMapsUri",
  "places.location",
  "nextPageToken",
].join(",");

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- Places ---------- */

async function buscar(textQuery, pageToken = null) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": CAMPOS,
    },
    body: JSON.stringify({
      textQuery,
      languageCode: "es",
      regionCode: "EC",
      pageSize: 20,
      ...(pageToken ? { pageToken } : {}),
    }),
  });

  if (!res.ok) {
    console.warn(`  Places respondió ${res.status} para "${textQuery}"`);
    return { places: [], nextPageToken: null };
  }
  return res.json();
}

async function recolectar() {
  const porId = new Map();

  for (const q of CONSULTAS) {
    console.log(`Buscando: ${q}`);
    let token = null;
    let pagina = 0;

    do {
      const data = await buscar(q, token);
      for (const p of data.places ?? []) {
        if (!porId.has(p.id)) porId.set(p.id, p);
      }
      token = data.nextPageToken ?? null;
      pagina++;
      if (token) await dormir(2000); // el token tarda en activarse
    } while (token && pagina < 3);

    await dormir(400);
  }

  return [...porId.values()];
}

/* ---------- PageSpeed ---------- */

async function pageSpeed(url, intento = 1) {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.set("category", "performance");

  try {
    const res = await fetch(endpoint, { signal: AbortSignal.timeout(90000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const lh = data.lighthouseResult;
    const score = Math.round((lh?.categories?.performance?.score ?? 0) * 100);
    const lcpMs = lh?.audits?.["largest-contentful-paint"]?.numericValue ?? null;

    return {
      score,
      lcp: lcpMs ? +(lcpMs / 1000).toFixed(1) : null,
      error: null,
    };
  } catch (e) {
    if (intento < 3) {
      await dormir(5000 * intento);
      return pageSpeed(url, intento + 1);
    }
    return { score: null, lcp: null, error: e.message.slice(0, 60) };
  }
}

/* ---------- CSV ---------- */

const escapar = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const CABECERAS = [
  "nombre", "direccion", "whatsapp", "web", "maps",
  "pagespeed", "lcp_seg", "error_psi",
  "resenas", "estrellas",
  // Estas las llenas tú a mano:
  "responsive", "publica_precios", "agenda_whatsapp", "tamano", "notas",
];

async function guardarCsv(filas) {
  const lineas = [CABECERAS.join(",")];
  for (const f of filas) {
    lineas.push(CABECERAS.map((c) => escapar(f[c])).join(","));
  }
  await writeFile(CSV, "﻿" + lineas.join("\n"), "utf8"); // BOM para Excel
}

/* ---------- Principal ---------- */

async function main() {
  if (!existsSync("data")) await mkdir("data");

  let cache = {};
  if (existsSync(CACHE)) {
    cache = JSON.parse(await readFile(CACHE, "utf8"));
    console.log(`Cache con ${Object.keys(cache).length} lugares.\n`);
  }

  const lugares = await recolectar();
  console.log(`\n${lugares.length} veterinarias únicas encontradas.\n`);

  const filas = [];

  for (const [i, p] of lugares.entries()) {
    const nombre = p.displayName?.text ?? "";
    const web = p.websiteUri ?? "";

    let psi = cache[p.id]?.psi;

    if (web && !psi) {
      process.stdout.write(`[${i + 1}/${lugares.length}] ${nombre} ... `);
      psi = await pageSpeed(web);
      console.log(psi.error ? `error: ${psi.error}` : `${psi.score}/100 · LCP ${psi.lcp}s`);

      cache[p.id] = { psi };
      await writeFile(CACHE, JSON.stringify(cache, null, 2)); // guarda al vuelo
      await dormir(1500);
    } else if (!web) {
      console.log(`[${i + 1}/${lugares.length}] ${nombre} ... sin web`);
    }

    filas.push({
      nombre,
      direccion: p.formattedAddress ?? "",
      whatsapp: p.nationalPhoneNumber ?? "",
      web: web || "ninguna",
      maps: p.googleMapsUri ?? "",
      pagespeed: psi?.score ?? "",
      lcp_seg: psi?.lcp ?? "",
      error_psi: psi?.error ?? "",
      resenas: p.userRatingCount ?? 0,
      estrellas: p.rating ?? "",
      responsive: "",
      publica_precios: "",
      agenda_whatsapp: "",
      tamano: "",
      notas: "",
    });
  }

  await guardarCsv(filas);

  /* Los números que van a la web */
  const conWeb = filas.filter((f) => f.web !== "ninguna");
  const conScore = conWeb.filter((f) => typeof f.pagespeed === "number");
  const prom = (arr, k) =>
    arr.length ? +(arr.reduce((s, x) => s + x[k], 0) / arr.length).toFixed(1) : 0;

  console.log("\n─────────── RESUMEN ───────────");
  console.log(`Veterinarias analizadas:     ${filas.length}`);
  console.log(`Sin sitio web:               ${filas.length - conWeb.length}`);
  console.log(`Con sitio web:               ${conWeb.length}`);
  console.log(`PageSpeed móvil promedio:    ${prom(conScore, "pagespeed")}/100`);
  console.log(`Carga promedio (LCP):        ${prom(conScore, "lcp_seg")}s`);
  console.log(`\nCSV en ${CSV}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
