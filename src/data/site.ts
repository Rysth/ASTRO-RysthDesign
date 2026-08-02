export const WHATSAPP_NUMBER = "593988949117";

export const CITY = "Guayaquil";

// Dirección del perfil de Google Business, usada en el schema.org
// ProfessionalService de Layout.astro. Fuente: IDENTIDAD-RYSTHDESIGN.md.
export const ADDRESS = {
  streetAddress: "5° Cjón. 19B NE",
  addressLocality: "Guayaquil",
  postalCode: "090504",
  addressCountry: "EC",
};

export const GOOGLE_PROFILE_URL =
  "https://maps.google.com/?cid=3658144436538154407&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/rysthdesign",
  facebook: "https://facebook.com/rysthdesign",
  tiktok: "https://tiktok.com/@rysthdesign",
};

export function waLink(message: string) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}
