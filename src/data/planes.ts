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
    setup: 250,
    anual: 120,
    paraQuien: "Para el negocio con un solo objetivo: que lo llamen.",
    destacado: false,
    entregaDias: 7,
    rondas: 1,
    incluye: [
      "Una página de hasta 6 secciones",
      "Dominio, hosting y SSL incluidos",
      "Botón de WhatsApp y formulario de contacto",
      "Ficha de Google Business optimizada",
      "Carga en menos de 1 segundo, garantizado",
    ],
  },
  {
    slug: "informativo",
    nombre: "Sitio Informativo",
    setup: 450,
    anual: 140,
    paraQuien: "Para el negocio con varios servicios que necesita explicarlos.",
    destacado: true,
    entregaDias: 12,
    rondas: 2,
    incluye: [
      "Hasta 6 páginas",
      "Catálogo de hasta 40 productos",
      "Blog que administras tú mismo",
      "SEO configurado página por página",
      "2 rondas de cambios",
    ],
  },
];
