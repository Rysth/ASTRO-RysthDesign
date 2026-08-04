import type { ImageMetadata } from "astro";
import gocar from "@/assets/images/trabajos/gocar.webp";
import tramitesec from "@/assets/images/trabajos/tramitesec.webp";
import quickinventory from "@/assets/images/trabajos/quickinventory.webp";

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
  // Foto oficial (mockup tipo "shots"). Opcional: si todavía no existe una
  // captura para el proyecto, la tarjeta cae al bloque neutro (nombre +
  // rubro + stack) en vez de mostrar nada.
  captura?: ImageMetadata;
  capturaAjuste?: string;
  // Impacto en una línea. Opcional: solo se muestra cuando hay una cifra
  // real que respaldarlo, nunca una estimación.
  resultado?: string;
  testimonio?: Testimonio;
  // Si es false, la tarjeta se muestra de forma anónima (usa `anonimo` en
  // vez de nombre/rubro/descripcion) y no enlaza al sitio real.
  permisoPublicar: boolean;
  anonimo?: string;
  // Si es false, la tarjeta no es un link clickeable (el proyecto se
  // muestra pero no se manda tráfico al login real del cliente).
  mostrarEnlace: boolean;
  // Solo aplica a sitios estáticos propios; en apps con sesión (como las de
  // acá abajo) el badge se malinterpreta al lado de la propuesta de
  // velocidad, así que se omite.
  pagespeed?: number;
  url: string;
  muestra: boolean;
}

export const trabajos: Trabajo[] = [
  {
    nombre: "GoCar",
    rubro: "Plataforma de sorteos",
    descripcion:
      "Sorteos con selección de boletos en tiempo real y pagos por Payphone. Cliente en Cuenca.",
    tecnologias: ["React", "Zustand", "Rails", "Docker"],
    captura: gocar,
    permisoPublicar: true,
    mostrarEnlace: false,
    url: "https://gocar.rysthdesign.com/",
    muestra: false,
  },
  {
    nombre: "TramitesEC",
    rubro: "Gestión de trámites vehiculares",
    descripcion: "Gestión de trámites de matriculación vehicular.",
    tecnologias: ["React", "Tailwind", "Rails", "Docker"],
    captura: tramitesec,
    capturaAjuste: "-translate-y-[20%]",
    permisoPublicar: true,
    mostrarEnlace: false,
    url: "https://react-tramitesec-uxbm.onrender.com/",
    muestra: false,
  },
  {
    nombre: "QuickInventory",
    rubro: "Control de stock para minimarkets",
    descripcion: "Control de stock y ventas para minimarkets.",
    tecnologias: ["Rails"],
    captura: quickinventory,
    capturaAjuste: "-translate-y-[10%]",
    permisoPublicar: true,
    mostrarEnlace: false,
    url: "https://inventory.rysthdesign.com/",
    muestra: false,
  },
];
