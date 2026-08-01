export interface PasoProceso {
  numero: string;
  titulo: string;
  duracion: string;
  detalle: string;
}

export const proceso: PasoProceso[] = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    duracion: "1 día",
    detalle:
      "Llamada de 30 minutos. Salimos con el alcance cerrado y el precio en firme.",
  },
  {
    numero: "02",
    titulo: "Diseño",
    duracion: "2 a 4 días",
    detalle: "Te muestro la pantalla antes de programar nada. Aquí entran tus cambios.",
  },
  {
    numero: "03",
    titulo: "Desarrollo",
    duracion: "3 a 6 días",
    detalle: "Lo construyo en Astro y lo optimizo hasta que cargue en menos de un segundo.",
  },
  {
    numero: "04",
    titulo: "Entrega",
    duracion: "1 día",
    detalle: "Dominio activo, Google Business listo y 20 minutos para enseñarte a usarlo.",
  },
];
