export interface DatoAuditoria {
  numero: string;
  label: string;
}

// Auditoría manual de 30 veterinarias de Guayaquil (Google Maps + PageSpeed
// Insights). Reemplaza los TODO cuando termines la hoja — no se publica esta
// página con cifras inventadas.
export const totalAuditadas = 30;

export const datosAuditoria: DatoAuditoria[] = [
  {
    numero: "TODO: de 30",
    label: "Veterinarias en Guayaquil que no tienen sitio web",
  },
  {
    numero: "TODO",
    label: "Puntuación promedio de PageSpeed móvil, entre las que sí tienen sitio",
  },
  {
    numero: "TODO: seg",
    label: "Tiempo de carga (LCP) promedio de las que sí tienen sitio",
  },
  {
    numero: "TODO: de 30",
    label: "Sin una versión decente para celular",
  },
];
