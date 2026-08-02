export interface DatoAuditoria {
  numero: string;
  label: string;
}

// Auditoría propia sobre Google Places, agosto 2026: 190 veterinarias de
// Guayaquil. Conteos recalculados por scripts/psi.mjs sobre data/auditoria.csv
// (filtro NO_ES_SITIO), no a mano — reproducibles corriendo el script de nuevo.
export const totalAuditadas = 190;

const sinSitioPropio = 165;
const sinPresenciaWeb = 127;
const soloRedesSociales = 38;
const conSitioPropio = 25;

const porcentaje = (n: number) => Math.round((n / totalAuditadas) * 100);

export const porcentajeSinSitioPropio = porcentaje(sinSitioPropio);

export const datosAuditoria: DatoAuditoria[] = [
  {
    numero: `${sinSitioPropio} de ${totalAuditadas}`,
    label: `No tienen sitio web propio (${porcentaje(sinSitioPropio)}%)`,
  },
  {
    numero: `${sinPresenciaWeb} de ${totalAuditadas}`,
    label: `No tienen absolutamente ninguna presencia web (${porcentaje(sinPresenciaWeb)}%)`,
  },
  {
    numero: `${soloRedesSociales} de ${totalAuditadas}`,
    label: `Solo tienen Instagram o Facebook (${porcentaje(soloRedesSociales)}%)`,
  },
  {
    numero: `${conSitioPropio} de ${totalAuditadas}`,
    label: `Sí tienen sitio propio (${porcentaje(conSitioPropio)}%)`,
  },
  {
    numero: "64.6/100",
    label: "Puntuación promedio de PageSpeed móvil, entre las que sí tienen sitio propio",
  },
];

export const fuenteAuditoria =
  "Fuente: auditoría propia sobre Google Places, agosto 2026.";
