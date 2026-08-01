# Identidad de marca — RysthDesign

Documento de referencia. Todo diseño (web, flyers, propuestas) sale de aquí.
Si algo no está en este documento, no se usa.

---

## 1. Posicionamiento

**Qué vendemos:** sistemas web que atienden y venden solos.
**Qué NO vendemos:** "páginas web bonitas".

La web es la puerta de entrada. El producto real es el flujo completo:
sitio → captura → WhatsApp automatizado → CRM → aviso al dueño.

**Frase base (para bio, hero, propuestas):**
> Sitios web que no se quedan quietos: capturan, responden y te avisan.

**Alternativas cortas:**
- Web + automatización para negocios que no quieren perder clientes.
- Tu negocio, atendiendo 24/7. Sin contratar a nadie.

**Descriptor bajo el logo:** `Web · Automatización`
(reemplaza a "Art & Code", que no dice qué haces)

**Cliente objetivo:** negocio local con 1–20 empleados que ya recibe mensajes
por WhatsApp o Instagram y los está perdiendo por no responder a tiempo.

---

## 2. Logo

**Marca:** chevron ascendente + rombo inferior. Geométrica, angular, monocromo.

### Reglas
| Regla | Valor |
|---|---|
| Espacio libre mínimo | Alto del rombo inferior, en los 4 lados |
| Tamaño mínimo | 24px de alto (digital), 8mm (impreso) |
| Versiones permitidas | Blanco sobre Void · Void sobre Blanco · Violeta sobre Void |
| Formato de archivo | SVG siempre que se pueda; PNG con transparencia si no |

### Prohibido
- Aplicar degradados, sombras, brillos o contornos
- Rotar, inclinar o deformar la proporción
- Colocarlo sobre fotos con detalle detrás de la marca
- Usar el logo y el nombre "RysthDesign" apilados si ya hay un titular grande
- Encerrarlo en círculos o cuadros que no sean el avatar de red social

### Archivos que necesitas exportar
```
logo-blanco.svg      logo-blanco.png (2048px)
logo-void.svg        logo-void.png (2048px)
logo-violeta.svg
avatar-1080.png      (logo blanco centrado sobre Void, sin margen extra)
favicon.svg          favicon-512.png
```

---

## 3. Color

### Tokens

| Token | Hex | Uso |
|---|---|---|
| `--void` | `#08080C` | Fondo principal. Todo nace de aquí. |
| `--carbon` | `#14141C` | Tarjetas, secciones alternas, inputs |
| `--slate` | `#22222E` | Bordes, divisores, líneas de 1px |
| `--white` | `#FFFFFF` | Texto principal, logo |
| `--smoke` | `#8A8A99` | Texto secundario, captions, labels |
| `--violeta` | `#7B5CFF` | **Acento de marca.** Links, iconos, énfasis, chevrons |
| `--violeta-deep` | `#5B3FD9` | Hover de violeta, fondos de badge |
| `--senal` | `#00E5A0` | **Solo CTAs y confirmaciones.** Nada más. |
| `--senal-deep` | `#00B87F` | Hover de señal |

### Proporción obligatoria
```
60% Void  ·  25% Blanco/Humo  ·  12% Violeta  ·  3% Señal
```

### La regla que más importa
**El verde Señal solo aparece en:**
- El botón principal de la página (uno solo por pantalla)
- Los checkmarks de "qué incluye"
- Estados de éxito ("Mensaje enviado")

Si el verde aparece en un titular, en un fondo o en más de un botón por
pantalla, deja de significar "haz clic aquí" y el diseño se vuelve ruido.
Ese es el error #1 en el material actual.

### Sin degradados
Fondos planos. Un degradado sutil de Void a Carbon en el hero es lo máximo
permitido, y es opcional. Nada de mesh, glow, ni bordes brillantes.

---

## 4. Tipografía

| Rol | Familia | Peso | Dónde |
|---|---|---|---|
| Display | **Sora** | 700 | Titulares H1, H2 |
| Cuerpo | **Inter** | 400 / 500 | Todo el texto corrido, botones, nav |
| Utilidad | **JetBrains Mono** | 500 | Eyebrows, etiquetas, precios, datos técnicos |

Las tres son gratis, están en Google Fonts, Figma y Canva.

### Escala (web)

```css
--fs-display: clamp(2.75rem, 6vw, 4.5rem);  /* Sora 700, ls -0.03em, lh 0.95 */
--fs-h2:      clamp(1.875rem, 4vw, 2.75rem); /* Sora 700, ls -0.02em, lh 1.1 */
--fs-h3:      1.375rem;                      /* Sora 700, lh 1.3 */
--fs-body:    1.0625rem;                     /* Inter 400, lh 1.7 */
--fs-small:   0.875rem;                      /* Inter 400, lh 1.6 */
--fs-eyebrow: 0.75rem;                       /* Mono 500, UPPER, ls 0.14em */
```

### Reglas
- Titulares en **sentence case**, no MAYÚSCULAS completas. Excepción: eyebrows en mono.
- Máximo 2 tamaños de titular por pieza gráfica.
- Ancho de línea de texto corrido: 60–75 caracteres. Nunca a lo ancho completo.
- Fuera: Anton, Bebas Neue, Montserrat, Poppins y cualquier condensada pesada.

---

## 5. Sistema visual

### Espaciado
Base de 4px. Usa solo: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.

### Bordes y esquinas
- Radio botones: `4px`
- Radio tarjetas: `6px`
- Grosor de borde: `1px solid var(--slate)` siempre
- Nada de esquinas muy redondeadas — el logo es angular, el sistema también.

### Elemento firma
**El chevron como marcador estructural.** El triángulo superior del logo,
en violeta, a 12–16px, marca:
- El inicio de cada sección (junto al eyebrow)
- Cada ítem de las listas de "qué incluye"
- Los pasos numerados del proceso

Es lo único decorativo permitido. Reemplaza a todos los emojis.

### Iconografía
Lucide o Tabler, versión **outline**, grosor 1.5px, color Humo o Violeta.
Nunca iconos rellenos, nunca iconos 3D, nunca emojis dentro de un diseño.

### Fotografía y mockups
- Capturas reales de proyectos, no stock genérico
- Mockups de dispositivo simples y planos, sin perspectiva exagerada
- Sin sombras dramáticas ni reflejos

### Movimiento
- Transiciones de `150ms ease-out` en hover
- Un solo reveal al hacer scroll por sección (fade + 12px de subida), no más
- Respetar `prefers-reduced-motion: reduce` siempre

---

## 6. Voz y tono

**Directo, técnico, sin adorno.** Escribes como ingeniero que le explica algo
a un dueño de negocio, no como agencia vendiendo humo.

### Reglas
- Trata de "tú". Nunca "usted", nunca "nosotros" (eres una persona, no una corporación).
- Números concretos antes que adjetivos: "responde en 3 segundos" > "respuesta ultrarrápida".
- Frases cortas. Punto seguido antes que coma.
- Cero emojis en titulares o en diseño. En WhatsApp con cliente, uno máximo.

### Palabras prohibidas
`soluciones integrales` · `líderes en` · `innovador` · `de vanguardia` ·
`potencia tu marca` · `experiencia única` · `sinergia` · `transformación digital`

### Antes / después

| ❌ | ✅ |
|---|---|
| Soluciones digitales integrales para tu negocio | Tu web responde los mensajes mientras tú trabajas |
| Diseño web profesional de alta calidad | Sitio listo en 7 días. Precio cerrado. |
| Impulsa tu presencia online | Deja de perder clientes que escriben a las 11 de la noche |
| ¡CONTÁCTAME! 🚀 | Ver cómo funciona |

---

## 7. Plantillas de redes

### Avatar
Logo blanco centrado sobre Void. Sin texto. Mismo archivo en todas las redes.

### Portada / banner
Void plano · titular Sora 700 de máximo 6 palabras a la izquierda ·
mockup o captura a la derecha · logo arriba izquierda · web abajo derecha en mono.

### Post (1080×1350)
Un solo mensaje por pieza.
```
┌──────────────────────────────┐
│ ▲ logo                       │  <- 64px margen
│                              │
│ EYEBROW EN MONO              │
│ Titular de máximo            │  <- Sora 700, 2 líneas máx
│ seis palabras                │
│                              │
│      [ mockup / captura ]    │
│                              │
│ ▲ punto uno                  │  <- chevron violeta
│ ▲ punto dos                  │
│                              │
│ rysthdesign.com     @rysth…  │  <- mono, Humo
└──────────────────────────────┘
```

### Prohibido en posts
- Más de 2 colores de acento
- Fondos con degradado morado-azul
- Bordes de neón
- Números de teléfono, web, TikTok, Instagram y WhatsApp todos en la misma pieza
  (elige **un** canal de contacto por post)

---

## 8. Checklist antes de publicar

- [ ] ¿Un solo mensaje?
- [ ] ¿El titular tiene 6 palabras o menos?
- [ ] ¿Hay exactamente un elemento en verde Señal?
- [ ] ¿El logo está en la misma posición y tamaño que en las otras piezas?
- [ ] ¿Cero emojis dentro del diseño?
- [ ] ¿Solo Sora, Inter y JetBrains Mono?
- [ ] ¿El fondo es plano?
- [ ] Quita un elemento más. Casi siempre sobra uno.
