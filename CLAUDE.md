# NUPEC – Instrucciones para Claude Code

## Contexto del proyecto
Estás construyendo el sitio web de **NUPEC**, una marca de alimento para perros y gatos.
- Stack: **Next.js + Sanity CMS**
- 3 idiomas: ES / EN / FR
- Despliegue: DigitalOcean Droplet vía GitHub Actions
- Fecha de lanzamiento: 7 agosto 2025

El proyecto tiene dos recursos principales:
1. **Template Envato** – contiene componentes listos con animaciones, estilos y estructura HTML/CSS/JSX.
2. **Wireframes en Figma** – definen la arquitectura de información y el layout de cada página.

---

## Tu tarea principal

**El wireframe manda la estructura. El template provee los componentes.**

Para cada página que construyas:

1. **Analiza el wireframe** de Figma e identifica cada sección (hero, gallery, features, testimonials, CTA, footer, etc.).
2. **Localiza en el template** el componente que mejor corresponda a esa sección.
3. **Adapta el componente** del template para encajar con el contenido de NUPEC: textos, slugs, estructura de datos de Sanity.
4. **No reimplementes** lo que ya existe en el template. Reutiliza siempre que sea posible.
5. Si una sección del wireframe **no tiene equivalente en el template**, constrúyela nueva pero manteniendo consistencia visual (variables CSS, fuentes, tokens de animación del template).

---

## Mapeo de secciones (referencia)

| Sección en wireframe | Busca en el template          | Notas                                      |
|----------------------|-------------------------------|--------------------------------------------|
| Hero                 | `HeroSection` / `HeroBanner`  | Adaptar CTA a "Ver productos"              |
| Productos destacados | `ProductGrid` / `CardGrid`    | Datos desde Sanity (`/nutricion-canina/`)  |
| Gallery / lifestyle  | `ImageGallery` / `Masonry`    | Imágenes de marca NUPEC                    |
| Features / beneficios| `FeatureList` / `IconGrid`    | Íconos del template o Lucide React         |
| Testimonios          | `Testimonials` / `Reviews`    | Omitir si no hay datos reales              |
| Sobre nosotros strip | `AboutBand` / `SplitSection`  | Vincular a `/nosotros`                     |
| Conciencia social    | `ContentBlock`                | Vincular a `/conciencia`                   |
| CTA final            | `CTASection` / `BannerCTA`    | CTA principal: "Conoce nuestra línea"      |
| Footer               | `Footer`                      | Incluir links ES/EN/FR y redes sociales    |

---

## Estructura de slugs definitivos

```
/nutricion-canina/
  /nutricion-diaria
  /nutricion-especializada
  /nutricion-clinica
  /premios-funcionales
  /suplementos
  /alimentos-humedos

/nutricion-felina/
  (mismas 6 categorías)

/nosotros
/conciencia
/blog
/contacto
```

Canino: 37 productos · Felino: 22 productos

---

## Reglas de implementación

### Componentes
- Usa **componentes funcionales** con TypeScript.
- Props tipadas; no uses `any`.
- Los componentes de página van en `/app/[locale]/` (i18n con `next-intl` o similar).
- Los componentes reutilizables van en `/components/`.

### Estilos
- **No sobreescribas** las variables CSS globales del template sin necesidad.
- Si necesitas ajustar un componente del template, extiéndelo en un archivo local, no edites el original.
- Tailwind OK si el template ya lo usa; de lo contrario respeta el sistema de CSS del template.

### Animaciones
- Mantén las animaciones del template (scroll-trigger, fade-in, etc.).
- No agregues nuevas librerías de animación sin preguntar.

### Sanity
- Los datos de productos, categorías y páginas vienen de Sanity.
- Usa `groq` queries; no hardcodees contenido que deba ser editable.
- Estructura de un producto:
  ```ts
  {
    name: string,
    slug: string,
    species: 'canine' | 'feline',
    category: string, // uno de los 6 slugs de categoría
    lifeStage: 'cachorro' | 'adulto' | 'senior',
    breedSize?: 'mini' | 'mediana' | 'grande',
    specialNeeds?: string[],
    technicalSheet: File,
    ingredients: string,
    feedingGuide: string,
    presentations: string[],
    whereToBy: string // URL externa
  }
  ```

### i18n
- Todos los textos estáticos en archivos de mensajes (`/messages/es.json`, `en.json`, `fr.json`).
- Nunca texto hardcodeado en JSX.

---

## Flujo de trabajo recomendado

1. Recibe el screenshot o descripción de una sección del wireframe.
2. Lista los componentes del template que podrían usarse.
3. Propón el mapeo antes de escribir código (una línea por sección).
4. Espera confirmación o ajuste.
5. Implementa la página ensamblando los componentes del template.
6. Muestra un resumen de: qué se reutilizó, qué se creó nuevo, qué falta.

---

## Lo que NO debes hacer

- ❌ Reescribir componentes del template que ya funcionan.
- ❌ Instalar librerías nuevas sin avisar.
- ❌ Hardcodear texto visible al usuario.
- ❌ Crear estilos inline (`style={{}}`) salvo para valores dinámicos.
- ❌ Ignorar la estructura de slugs definitiva.

---

## Pregunta siempre si…

- Una sección del wireframe tiene dos o más equivalentes en el template (pregunta cuál prefiere el usuario).
- Un componente del template requiere datos que no están definidos en el schema de Sanity.
- El wireframe muestra una interacción que no está cubierta por el template.
