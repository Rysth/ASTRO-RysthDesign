export interface Testimonio {
  texto: string;
  autor: string;
  cargo: string;
  empresa: string;
}

export interface Trabajo {
  nombre: string;
  rubro: string;
  descripcion: string;
  tecnologias: string[];
  // Impacto en una línea. Opcional: solo se muestra cuando hay una cifra
  // real que respaldarlo, nunca una estimación.
  resultado?: string;
  testimonio?: Testimonio;
  // Si es false, la tarjeta se muestra de forma anónima (usa `anonimo` en
  // vez de nombre/rubro/descripcion) y no enlaza al sitio real.
  permisoPublicar: boolean;
  anonimo?: string;
  // Solo aplica a sitios estáticos propios; en apps con sesión (como las de
  // acá abajo) el badge se malinterpreta al lado de la propuesta de
  // velocidad, así que se omite.
  pagespeed?: number;
  url: string;
  muestra: boolean;
}

export const trabajos: Trabajo[] = [
  {
    nombre: "StockManager",
    rubro: "ERP y facturación electrónica",
    descripcion:
      "Facturación electrónica integrada al SRI con firma digital XAdES-BES y generación de RIDE.",
    tecnologias: ["React 19", "Rails 8", "PostgreSQL", "Sidekiq", "Redis"],
    permisoPublicar: true,
    url: "https://stockmanager.rysthdesign.com/",
    muestra: false,
  },
  {
    nombre: "GoCar",
    rubro: "Plataforma de sorteos",
    descripcion:
      "Sorteos con selección de boletos en tiempo real y pagos por Payphone. Cliente en Cuenca.",
    tecnologias: ["React", "Zustand", "Rails", "Docker"],
    permisoPublicar: true,
    url: "https://gocar.rysthdesign.com/",
    muestra: false,
  },
  {
    nombre: "TramitesEC",
    rubro: "Gestión de trámites vehiculares",
    descripcion: "Gestión de trámites de matriculación vehicular.",
    tecnologias: ["React", "Tailwind", "Rails", "Docker"],
    permisoPublicar: true,
    url: "https://react-tramitesec-uxbm.onrender.com/",
    muestra: false,
  },
  {
    nombre: "QuickInventory",
    rubro: "Control de stock para minimarkets",
    descripcion: "Control de stock y ventas para minimarkets.",
    tecnologias: ["Rails"],
    permisoPublicar: true,
    url: "https://inventory.rysthdesign.com/",
    muestra: false,
  },
];
