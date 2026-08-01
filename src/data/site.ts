export const WHATSAPP_NUMBER = "593988949117";

// TODO: ciudad para SEO local (Layout.astro y schema.org de la Fase 3).
export const CITY = "TODO";

export function waLink(message: string) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}
