export interface Plan {
  nombre: string;
  paraQuien: string;
  setup: string;
  anual: string;
  items: string[];
  destacado?: boolean;
}

// Precios en TODO: son cifras de negocio, no las inventamos — confirmar antes de publicar.
export const planes: Plan[] = [
  {
    nombre: "Presencia",
    paraQuien:
      "Para negocios que necesitan estar en internet ya, sin automatización todavía.",
    setup: "TODO: precio de setup",
    anual: "TODO: precio anual",
    items: [
      "Sitio a medida sobre el sistema de marca",
      "Responsive real desde 360px",
      "Formulario de contacto",
      "SEO técnico básico",
      "Hosting y dominio configurados",
    ],
  },
  {
    nombre: "Negocio",
    paraQuien:
      "Para negocios que reciben mensajes por WhatsApp y no dan abasto respondiendo.",
    setup: "TODO: precio de setup",
    anual: "TODO: precio anual",
    destacado: true,
    items: [
      "Todo lo del plan Presencia",
      "WhatsApp con respuesta automática",
      "Captura de datos del cliente que escribe",
      "Aviso al dueño ante cada mensaje nuevo",
      "Panel simple para ver conversaciones",
    ],
  },
  {
    nombre: "Sistema",
    paraQuien:
      "Para negocios que quieren el flujo completo: sitio, WhatsApp y seguimiento de clientes.",
    setup: "TODO: precio de setup",
    anual: "TODO: precio anual",
    items: [
      "Todo lo del plan Negocio",
      "CRM conectado para dar seguimiento",
      "Reportes de mensajes y conversiones",
      "Automatizaciones a medida",
      "Soporte prioritario",
    ],
  },
];
