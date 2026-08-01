#!/usr/bin/env node
// Actualiza src/data/resenas.json desde Places API (New). Se corre a mano
// con `npm run resenas` — nunca en build. Si falla o faltan credenciales,
// avisa por consola y sale con éxito dejando el JSON existente intacto.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "src/data/resenas.json");
const envPath = path.join(root, ".env");

function cargarEnv() {
  if (!existsSync(envPath)) return;
  for (const linea of readFileSync(envPath, "utf-8").split("\n")) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith("#")) continue;
    const idx = limpia.indexOf("=");
    if (idx === -1) continue;
    const clave = limpia.slice(0, idx).trim();
    let valor = limpia.slice(idx + 1).trim();
    if (
      (valor.startsWith('"') && valor.endsWith('"')) ||
      (valor.startsWith("'") && valor.endsWith("'"))
    ) {
      valor = valor.slice(1, -1);
    }
    if (!(clave in process.env)) process.env[clave] = valor;
  }
}

function leerExistente() {
  if (!existsSync(dataPath)) {
    return { rating: 0, total: 0, perfilUrl: "", actualizado: "", resenas: [] };
  }
  return JSON.parse(readFileSync(dataPath, "utf-8"));
}

function salirConExistente(motivo) {
  console.warn(`[resenas] ${motivo}`);
  console.warn("[resenas] Se conserva src/data/resenas.json tal cual está.");
  process.exit(0);
}

cargarEnv();

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

if (!apiKey || !placeId) {
  salirConExistente(
    "Falta GOOGLE_PLACES_API_KEY o GOOGLE_PLACE_ID en .env (ver .env.example). " +
      "El Place ID se obtiene con el Place ID Finder de Google, no es el CID que trae el link de Maps.",
  );
}

const existente = leerExistente();

let respuesta;
try {
  respuesta = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
    },
  });
} catch (error) {
  salirConExistente(`No se pudo contactar Places API (${error.message}).`);
}

if (!respuesta.ok) {
  const cuerpo = await respuesta.text();
  salirConExistente(`Places API respondió ${respuesta.status}: ${cuerpo}`);
}

const datos = await respuesta.json();

const resenasApi = (datos.reviews ?? []).map((r) => ({
  autor: r.authorAttribution?.displayName ?? "Anónimo",
  inicial: (r.authorAttribution?.displayName ?? "?").trim().charAt(0).toUpperCase(),
  estrellas: r.rating ?? 5,
  fecha: (r.publishTime ?? "").slice(0, 10),
  texto: r.text?.text ?? r.originalText?.text ?? "",
  origen: "api",
}));

const resenasManuales = existente.resenas.filter((r) => r.origen === "manual");

const actualizado = {
  rating: datos.rating ?? existente.rating,
  total: datos.userRatingCount ?? existente.total,
  perfilUrl: datos.googleMapsUri ?? existente.perfilUrl,
  actualizado: new Date().toISOString().slice(0, 10),
  resenas: [...resenasApi, ...resenasManuales],
};

writeFileSync(dataPath, `${JSON.stringify(actualizado, null, 2)}\n`);

console.log(
  `[resenas] Listo: ${resenasApi.length} de la API + ${resenasManuales.length} manuales = ${actualizado.resenas.length} totales.`,
);
