import type { ImageMetadata } from "astro";

export interface Demo {
  nombre: string;
  url: string;
  captura: ImageMetadata | null;
}

// El demo (demo-veterinaria.rysthdesign.com) todavía no está construido —
// es el paso 2 del sprint, aparte de este build. No se pone un link ni una
// captura acá hasta que exista de verdad; DemoVeterinarias.astro muestra un
// placeholder mientras tanto.
export const demo: Demo = {
  nombre: "Demo Veterinaria",
  url: "",
  captura: null,
};
