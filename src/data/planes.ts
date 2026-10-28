export interface Complemento {
  nombre: string;
  precio: string;
}

export interface Plan {
  slug: string;
  nombre: string;
  categoria: string;
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
];

export const aMedida = {
  nombre: "Sistema Web a Medida",
  desde: 800,
  descripcion:
    "Lógica propia, paneles de administración, pagos o integraciones con otros sistemas.",
};
