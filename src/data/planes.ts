export interface Plan {
  slug: string;
  nombre: string;
  setup: number;
  anual: number;
  paraQuien: string;
  destacado: boolean;
  entregaDias: number;
  rondas: number;
  incluye: string[];
}

export const planes: Plan[] = [
  {
    slug: "landing",
    nombre: "Landing Page",
    setup: 200,
    anual: 50,
    paraQuien: "Para el negocio que solo necesita una página clara para vender o recibir mensajes.",
    destacado: false,
    entregaDias: 7,
    rondas: 1,
    incluye: [
      "Una página de hasta 6 secciones",
      "Botón de WhatsApp y formulario de contacto",
      "Diseño adaptado a tu marca",
      "Publicación en Netlify",
      "Dominio configurado a tu nombre",
      "Carga rápida y optimización básica",
    ],
  },
  {
    slug: "informativo",
    nombre: "Sitio Informativo",
    setup: 300,
    anual: 50,
    paraQuien: "Para el negocio que necesita explicar sus servicios con más detalle.",
    destacado: true,
    entregaDias: 7,
    rondas: 1,
    incluye: [
      "Hasta 5 páginas o secciones",
      "Botón de WhatsApp y formulario de contacto",
      "SEO básico por página",
      "Publicación en Netlify",
      "Dominio configurado a tu nombre",
      "1 ronda de cambios",
    ],
  },
];
