export interface PasoProceso {
  numero: string;
  titulo: string;
  descripcion: string;
  duracion: string;
}

// Duración en TODO: son compromisos de entrega reales — confirmar antes de publicar.
export const proceso: PasoProceso[] = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    descripcion: "Revisamos qué necesita tu negocio y definimos el alcance.",
    duracion: "TODO: días",
  },
  {
    numero: "02",
    titulo: "Diseño",
    descripcion: "Armamos la estructura y el diseño sobre el sistema de marca.",
    duracion: "TODO: días",
  },
  {
    numero: "03",
    titulo: "Automatización",
    descripcion: "Configuramos WhatsApp, capturas y avisos según el plan elegido.",
    duracion: "TODO: días",
  },
  {
    numero: "04",
    titulo: "Entrega y ajustes",
    descripcion: "Publicamos el sitio y hacemos los ajustes finales.",
    duracion: "TODO: días",
  },
];
