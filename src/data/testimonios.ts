export interface Testimonio {
  texto: string;
  autor: string;
  cargo: string;
  empresa: string;
}

// Vacío a propósito: no se ha pedido testimonio a ningún cliente todavía.
// Testimonios.astro no se renderiza si este arreglo está vacío.
export const testimonios: Testimonio[] = [];
