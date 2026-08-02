import type { ImageMetadata } from "astro";
import stockmanager from "@/assets/images/trabajos/stockmanager.webp";
import gocar from "@/assets/images/trabajos/gocar.webp";
import tramitesec from "@/assets/images/trabajos/tramitesec.webp";
import quickinventory from "@/assets/images/trabajos/quickinventory.webp";

export interface Trabajo {
  nombre: string;
  rubro: string;
  descripcion: string;
  tecnologias: string[];
  captura: ImageMetadata;
  pagespeed: number;
  url: string;
  muestra: boolean;
}

export const trabajos: Trabajo[] = [
  {
    nombre: "StockManager",
    rubro: "ERP y facturación electrónica",
    descripcion:
      "ERP y punto de venta con facturación electrónica integrada al SRI: firma digital XAdES-BES, generación de RIDE y jobs asíncronos con Sidekiq.",
    tecnologias: ["React 19", "Rails 8", "PostgreSQL", "Sidekiq", "Redis"],
    captura: stockmanager,
    // PageSpeed móvil real falla con NO_FCP (la app no pinta contenido
    // dentro del límite de Lighthouse bajo el throttling móvil). En
    // escritorio sí corre: 83/100. Revisar el rendimiento móvil de la app.
    pagespeed: 83,
    url: "https://stockmanager.rysthdesign.com/",
    muestra: false,
  },
  {
    nombre: "GoCar",
    rubro: "Plataforma de sorteos",
    descripcion:
      "Plataforma de sorteos con selección de boletos en tiempo real y validación de pagos con Payphone. Cliente en Cuenca.",
    tecnologias: ["React", "Zustand", "Rails", "Docker"],
    captura: gocar,
    pagespeed: 52,
    url: "https://gocar.rysthdesign.com/",
    muestra: false,
  },
  {
    nombre: "TramitesEC",
    rubro: "Gestión de trámites vehiculares",
    descripcion:
      "Aplicación web para gestión de trámites de matriculación vehicular.",
    tecnologias: ["React", "Tailwind", "Rails", "Docker"],
    captura: tramitesec,
    pagespeed: 72,
    url: "https://react-tramitesec-uxbm.onrender.com/",
    muestra: false,
  },
  {
    nombre: "QuickInventory",
    rubro: "Control de stock para minimarkets",
    descripcion: "Control de stock y ventas para minimarkets.",
    tecnologias: ["Rails"],
    captura: quickinventory,
    pagespeed: 60,
    url: "https://inventory.rysthdesign.com/",
    muestra: false,
  },
];
