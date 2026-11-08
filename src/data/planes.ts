import type { ImageMetadata } from "astro";
import microtours from "@/assets/images/trabajos/microtours.webp";
import microerpExistencias from "@/assets/images/trabajos/microerp-existencias.png";

export interface Complemento {
  nombre: string;
  precio: string;
}

export interface Plan {
  slug: string;
  nombre: string;
  categoria: string;
  captura?: ImageMetadata;
  capturaAlt: string;
  // Página propia con el detalle del sistema (landing).
  landing?: string;
  // Mensaje de WhatsApp del botón «Pedir una demo».
  mensaje: string;
  setup: number;
  mensual: number;
  // Escalón de precio: se respeta hacia atrás para quien ya entró.
  nota: string;
  paraQuien: string;
  incluye: string[];
  complementos: Complemento[];
}

export const planes: Plan[] = [
  {
    slug: "microtours",
    nombre: "MicroTours",
    categoria: "Sistema de reservas",
    captura: microtours,
    capturaAlt: "Web de reservas de MicroTours para una agencia de tours",
    mensaje: "Hola, me interesa MicroTours para mi agencia. ¿Me muestras una demo?",
    setup: 300,
    mensual: 25,
    nota: "Lanzamiento · primeros 2 clientes",
    paraQuien:
      "Para agencias de viajes y operadoras turísticas que venden excursiones con cupos limitados. Vende asientos por salida desde tu web y desde WhatsApp, sin sobreventa.",
    incluye: [
      "Web de reservas para tu agencia, sin que el cliente cree cuenta",
      "Cupos por salida, cero sobreventa",
      "Ticket en PDF con QR que el guía valida desde el celular",
      "Abonos parciales, comprobantes y cobro de saldo al abordar",
      "Manifiesto de pasajeros listo para imprimir",
      "Roles para dueño, vendedor y guía",
      "Reportes de ventas por vendedor y por fechas",
    ],
    complementos: [
      { nombre: "Pago con tarjeta (Payphone)", precio: "+$50 · $10/mes" },
      { nombre: "Facturación electrónica SRI", precio: "desde $15/mes" },
    ],
  },
  {
    slug: "microerp",
    nombre: "MicroERP",
    categoria: "Inventario y ventas",
    captura: microerpExistencias,
    capturaAlt: "Existencias de una zapatería en MicroERP, con foto, talla y color de cada producto",
    landing: "/microerp",
    mensaje: "Hola, vi MicroERP en tu web. ¿Me muestras una demo por Meet para mi tienda?",
    setup: 300,
    mensual: 25,
    nota: "Primer mes gratis",
    paraQuien:
      "Para tiendas de zapatos, cosméticos, tecnología o suplementos. Sabes cuánto te queda de cada talla, color o sabor, qué vendió cada vendedora y quién te debe.",
    incluye: [
      "Existencias por talla, color o presentación, con foto",
      "Compras al proveedor: recibir mercadería y pagos por abonos",
      "Pedidos, cobros y saldos por cliente",
      "Cobro por transferencia con comprobante que sube el cliente",
      "Hasta 5 usuarios. La vendedora vende; compras y stock solo tú",
      "Tu catálogo cargado (hasta 500 productos) y 2 capacitaciones por Meet",
    ],
    complementos: [
      { nombre: "Facturación SRI (hasta 350 facturas al mes)", precio: "+$10/mes" },
      { nombre: "Facturación SRI ilimitada", precio: "+$18/mes" },
      { nombre: "Usuario adicional (desde el sexto)", precio: "$6.99/mes" },
      { nombre: "Catálogo de más de 500 productos", precio: "+$30" },
      { nombre: "Capacitación extra por Meet", precio: "$15/hora" },
    ],
  },
];

export const aMedida = {
  nombre: "Sistema Web a Medida",
  desde: 800,
  descripcion:
    "Lógica propia, paneles de administración, pagos o integraciones con otros sistemas.",
};
