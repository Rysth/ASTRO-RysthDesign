import type { ImageMetadata } from "astro";

export interface Trabajo {
  nombre: string;
  rubro: string;
  captura: ImageMetadata;
  pagespeed: number;
  url: string;
  muestra: boolean;
}

// Vacío a propósito: no hay proyectos reales todavía (el demo de veterinaria
// y los primeros clientes de septiembre están pendientes). Cuando exista una
// captura real, agrega la entrada acá — Trabajos.astro no se renderiza si
// este arreglo está vacío.
export const trabajos: Trabajo[] = [];
