# Chatwoot Homepage Enhancement Plan

## Overview
Add a dedicated Chatwoot spotlight section to the homepage to drive more traction for Chatwoot services, targeting business owners who need customer communication solutions.

---

## Files to Create

### 1. `src/components/sections/ChatwootSpotlightSection.astro`

**Purpose:** Featured service section highlighting Chatwoot with Before/After comparison, stats, and CTAs.

**Key Elements:**
- Green gradient theme (#25D366 → #128C7E) to stand out from purple/blue site theme
- "Servicio Destacado" badge with WhatsApp icon
- Headline: "¿Pierdes Mensajes de Clientes? Centraliza Todo en Un Solo Lugar"
- Before/After mini comparison (condensed from chatwoot.astro)
- 3 stats: "5x Más Rápido", "100% Organizado", "24/7 Disponible"
- 3 key benefits with icons
- Two CTAs: "Solicitar Demo Gratuita" (WhatsApp link) + "Conoce Más" (links to /servicios/chatwoot)
- Dashboard preview image with floating "Implementación 3-5 días" badge

---

## Files to Modify

### 2. `src/components/sections/ServicesSection.astro`

**Changes:**
- Add 4th service card for Chatwoot
- Change grid from `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-4`

**New Card Content:**
```
Icon: FaWhatsapp (green themed)
Title: "ChatWoot - Chat Omnicanal"
Description: "Centraliza WhatsApp, Facebook e Instagram en una sola plataforma. Atención al cliente 24/7 con historial completo y respuestas rápidas."
Bullets:
  - WhatsApp + Facebook + Instagram
  - Historial por cliente
  - Respuestas 5x más rápidas
CTA: "Ver ChatWoot" → /servicios/chatwoot
```

### 3. `src/pages/index.astro`

**Changes:**
- Add import: `import ChatwootSpotlightSection from "@/components/sections/ChatwootSpotlightSection.astro";`
- Insert section after ServicesSection:

```astro
<!-- Services Section - Core Offerings -->
<section id="servicios">
  <ServicesSection />
</section>

<!-- Chatwoot Spotlight - Featured Service -->
<ChatwootSpotlightSection />

<!-- Clients/Portfolio Section - Social Proof -->
<section id="clientes">
  <ClientsSection />
</section>
```

### 4. `src/components/sections/CTASection.astro`

**Changes:**
- Add secondary CTA button for Chatwoot alongside "Ver Servicios"

**New button:**
```astro
<a
  href="/servicios/chatwoot"
  class="inline-flex items-center gap-3 px-8 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
>
  <FaWhatsapp className="text-lg" />
  <span>Ver ChatWoot</span>
</a>
```

---

## Final Page Structure

```
HeroSection
→ BrandSection
→ TechnologySection
→ ContentAlternatingSection
→ FeaturesGridSection
→ ServicesSection (now with 4 cards including Chatwoot)
→ ChatwootSpotlightSection (NEW - featured service spotlight)
→ ClientsSection
→ CTASection (with Chatwoot CTA)
→ ContactForm
```

---

## Design Notes

- Chatwoot section uses green gradient (#25D366 → #128C7E) to visually differentiate
- All existing design patterns maintained (glassmorphism, gradient borders, floating animations)
- Fully responsive with mobile-first considerations
- WhatsApp CTA links use the same pre-filled message as the Chatwoot service page
