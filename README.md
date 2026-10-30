# Byron Cardona — Portafolio

Sitio editorial estático de Byron Cardona, Frontend Developer. Tres idiomas (`es`, `en`, `ru`), generación estática con Next.js y despliegue en Hostinger sin servidor Node.

```
https://tudominio.com/es/
https://tudominio.com/en/
https://tudominio.com/ru/
```

`/` redirige a `/es/` en el cliente. No hace falta ninguna regla de servidor.

---

## 1. Instalación

Requisito: Node.js 20.9 o superior.

```bash
npm install
```

## 2. Ejecución local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El idioma inicial es español.

Otros comandos:

| Comando | Función |
|---|---|
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript estricto |
| `npm run build` | Compilación + verificación de `out/` |
| `npm run preview` | Sirve `out/` como lo haría Hostinger |
| `npm run check` | lint + tipos + build |

## 3. Compilación para producción

```bash
NEXT_PUBLIC_SITE_URL=https://tudominio.com npm run build
```

Sin esa variable, canonical, Open Graph y sitemap usan `https://example.com`. Cópiala a `.env.local` (ver `.env.example`) para no repetirla.

## 4. Archivos generados

Todo el sitio queda en `out/`:

```
out/
  index.html              → redirige a /es/
  404.html                → página 404 trilingüe
  icon.svg
  apple-icon.png
  robots.txt
  sitemap.xml
  manifest.webmanifest
  .htaccess               → opcional, para Apache / LiteSpeed
  es/index.html
  es/og.png
  en/index.html
  en/og.png
  ru/index.html
  ru/og.png
  fonts/
  _next/static/           → CSS y JS con hash
```

No hay proceso Node en producción. Cualquier servidor de archivos estáticos basta.

## 5. Subida a Hostinger

1. En el panel de Hostinger, abre el **Administrador de archivos** (o conéctate por FTP).
2. Entra en `public_html` del dominio (o en la carpeta del subdominio).
3. Vacía el contenido anterior si estás reemplazando un sitio.
4. Sube **el contenido de `out/`**, no la carpeta `out` en sí. `index.html` debe quedar en la raíz de `public_html`.
5. Conserva `.htaccess` si el hosting usa Apache o LiteSpeed. El sitio funciona igual sin él: el archivo solo añade la página 404 de marca, compresión y caché larga para `/_next/static` y `/fonts`.

No hace falta Node, PHP ni un rewrite especial. `trailingSlash: true` genera `es/index.html`, de modo que `/es/` resuelve solo.

## 6. Configuración del dominio

1. Apunta el dominio (o `www`) a Hostinger.
2. Activa HTTPS.
3. Compila de nuevo con `NEXT_PUBLIC_SITE_URL=https://tudominio.com` (sin barra final) y vuelve a subir `out/`.
4. Si usas `www` y el dominio desnudo, elige uno como canónico en el panel y redirige el otro.

## 7. Enlaces personales

Edita `src/content/contact.ts`. Un campo en `null` se muestra como «Disponible pronto» y **nunca** se convierte en un enlace vacío.

```ts
export const contact = {
  email: "hola@tudominio.com",
  linkedin: "https://www.linkedin.com/in/usuario/",
  github: "https://github.com/usuario",
  whatsapp: "573001234567", // dígitos, con código de país
};
```

## 8. Sustitución de la fotografía

Mientras `portrait.src` sea `null`, el hueco muestra el plano de construcción del monograma. No hay retrato de otra persona.

1. Exporta la foto en proporción **4:5**.
2. Genera tres archivos en `public/images/`:

   ```
   byron-cardona-800.avif
   byron-cardona-800.webp
   byron-cardona-1400.webp
   ```

3. En `src/content/profile.ts`:

   ```ts
   portrait: {
     src: "/images/byron-cardona",
     width: 1400,
     height: 1750,
     focus: "50% 30%", // object-position
   }
   ```

Instrucciones detalladas: `public/images/README.md`.

## 9. Incorporación de proyectos

Los proyectos viven en `src/content/projects.ts`. Solo se publican las entradas con `status: "published"`. No hace falta tocar componentes.

Campos: `slug`, `name`, `year`, `status`, `summary`, `problem`, `solution`, `role`, `stack`, `cover`, `gallery`, `demoUrl`, `repoUrl`, `body`, `detail`.

- `detail: true` genera `/{lang}/work/{slug}/`.
- `stack` acepta ids de `src/content/skills.ts` o etiquetas libres.
- Con cero proyectos, la sección muestra una placa editorial, no una cuadrícula vacía.

La experiencia de Monitoreo Inteligente SAS se edita en `src/content/experience.ts`. Las tecnologías, en `src/content/skills.ts`.

## 10. Actualización de traducciones

Diccionarios tipados en `src/i18n/dictionaries/`:

- `es.ts` define la forma (`Dictionary`).
- `en.ts` y `ru.ts` deben cubrir las mismas claves. TypeScript falla el build si falta alguna.

Textos de contenido (experiencia, proyectos, notas de herramientas) van junto a los datos, no en el diccionario de interfaz.

Al cambiar de idioma se conserva la sección visible (`/en/#work` si estabas en `#work`).

## 11. Validación del sitio publicado

Después de subir `out/`:

1. `https://tudominio.com/` llega a `/es/`.
2. `/es/`, `/en/` y `/ru/` cargan con el `lang` correcto.
3. El selector de idioma cambia de ruta y mantiene el ancla.
4. Navegación, índice móvil y «Saltar al contenido» funcionan con teclado. El foco es visible.
5. Los canales de contacto pendientes no son enlaces.
6. `/robots.txt` y `/sitemap.xml` existen y apuntan al dominio real.
7. La imagen Open Graph (`/es/og.png`) muestra el titular y el monograma.
8. Una URL inexistente sirve `404.html`.
9. No hay scroll horizontal en 320 px.

En local, el mismo recorrido se hace con `npm run preview`.

---

## Identidad

**Concepto.** La estructura permite cuestionar lo evidente. El sitio lo demuestra: retícula de 12 columnas, rupturas controladas, una serif itálica que abre un hueco de intuición dentro de frases rigurosas.

**Monograma BC.** La B y la C comparten módulo. El trazo izquierdo de la B es tangente al círculo de la C exactamente donde se encuentran los dos bowls: esa junta, un cuadrado de cobre, es el único acento cromático de la marca.

**Tipografía.**

| Voz | Familia | Uso |
|---|---|---|
| Editorial | Cormorant (variable, latin + cirílico) | Titulares |
| Interfaz | Onest (variable, latin + cirílico) | Lectura, navegación |
| Índice | IBM Plex Mono | Etiquetas, metadatos, ficha |

Las tres cubren español, inglés y ruso. Están autoalojadas, partidas por `unicode-range`.

**Color.** Carbón `#171715`, grafito `#292824`, marfil `#E9E2D5`, arena `#B8A990`, cobre `#A76A45`. El cobre no pinta superficies: marca juntas, índices y el acento itálico del cierre. Contraste marfil/carbón ≈ 14:1; arena ≈ 7.9:1.

**Interacción distintiva.** «Ver estructura» revela la retícula y las especificaciones tipográficas. El mapa de tecnologías no es un muro de logotipos: al elegir una herramienta se iluminan las que se conectan con ella en el trabajo diario.

---

## Cómo está organizado

```
src/
  app/[lang]/          rutas /es /en /ru
  app/[lang]/og.png/   imagen Open Graph por idioma
  app/(root)/          "/" → /es/
  components/          layout, secciones, UI, marca
  content/             datos editables
  i18n/                diccionarios
  styles/              tokens, tipografía, utilidades
  lib/                 SEO, i18n, secciones activas
public/fonts/          woff2 locales
public/images/         retrato y proyectos
```

Componentes de cliente solo donde hay estado: cabecera, menú, mapa de habilidades, copiar correo, observador de revelado.

---

## Limitaciones pendientes

- **Dominio.** Hasta definir `NEXT_PUBLIC_SITE_URL`, canonical y Open Graph apuntan a `example.com`.
- **Contacto.** Correo, LinkedIn, GitHub y WhatsApp están en `null`.
- **Retrato.** Placeholder editorial hasta que existan los tres archivos de imagen.
- **Proyectos públicos.** La colección está vacía a propósito. La experiencia profesional reciente es de un producto privado y no se expone.
- **Lighthouse.** No se han publicado puntuaciones medidas en este entorno. El objetivo de diseño es ≥ 90 en las cuatro categorías; hay que verificarlas sobre el dominio real, con la foto ya sustituida.
- **Fechas laborales exactas.** El periodo de Monitoreo Inteligente SAS está escrito como «Aprox. 3 años» hasta que existan fechas confirmadas.

No hay métricas inventadas, testimonios, certificaciones ni proyectos ficticios.
