# Everest Claims & Advisory UI/UX Upgrade

This repository contains the visual, layout, and front-end code-quality upgrade for **everestclaims.com.np**, a marketing site for Everest Claims & Advisory Pvt. Ltd. (Nepal).

The site is built strictly with **vanilla HTML5, CSS3, and modern JavaScript (ES6)** with no build step requirements, preserving a fast, static multi-page architecture.

---

## 📁 File and Folder Structure

```
Everest_Claims/
├── CNAME
├── 404.html                  # Custom redirect-capable 404 page
├── index.html                # Homepage (12 main semantic sections)
├── about.html                # About Us page
├── services.html             # Our Services (deep-link client router)
├── claims-process.html       # Settlement timeline & guides
├── cases.html                # Case Studies (dynamic category filters)
├── careers.html              # Careers page (job listings)
├── contact.html              # Contact page (validated forms)
├── privacy-policy.html       # Legal privacy documentation
├── terms-of-service.html     # Legal terms structure
├── disclaimer.html           # Legal disclaimers page
├── styles.css                # Global stylesheet importing modular partials
├── script.js                 # Shared interactivity script
├── assets/
│   └── img/                  # Visual assets (Optimized logo and image files)
└── css/                      # Modular native CSS stylesheets
    ├── variables.css         # Design tokens (colors, space scale, font variables)
    ├── base.css              # HTML element defaults, typography reset, skip-links
    ├── components.css        # Reusable component cards, glass panels, buttons, headers
    ├── sections.css          # Specific section structures (timelines, marquees, sliders)
    └── utilities.css         # Keyframe floats, blur blobs, scroll reveal tags
```

---

## 🎨 CSS Design Tokens & Variable Architecture

All spacing, fonts, and colors are defined dynamically as CSS Custom Properties in `css/variables.css`:

### Spacing System (8px Baseline)
Spacing increments are standard across margin, padding, and gap properties:
- `--space-xs`: `4px`
- `--space-sm`: `8px`
- `--space-md`: `12px`
- `--space-lg`: `16px`
- `--space-xl`: `24px`
- `--space-2xl`: `32px`
- `--space-3xl`: `48px`
- `--space-4xl`: `64px`

### Corporate Color Palette
- `--brand-red`: `#CB3E2D` (Everest brand red)
- `--brand-green`: `#2F7243` (Brand green accent)
- `--dark-text`: `#1F2937` (High-contrast slate for readability)
- `--muted-text`: `#6B7280` (Muted gray for paragraphs)
- `--light-gray`: `#F5F7F9` (Ice white panels backing)

### Typography Scaling
- `--font-sans`: `'Plus Jakarta Sans', system-ui, sans-serif` (Primary typography)
- `--font-nepali`: `'Noto Sans Devanagari', 'Mukta', sans-serif` (Testimonial scripts with customized line-height offsets)

---

## 🚀 Adding a New Page or Section

1. **Link the Global Styles**:
   At the head of any new page, reference the parent stylesheet:
   ```html
   <link href="./styles.css" rel="stylesheet">
   ```
2. **Implement the Accessible Skip-Link**:
   Add the skip-link element as the first child of `<body>`:
   ```html
   <a href="#main-content" class="skip-link">Skip to Main Content</a>
   ```
3. **Incorporate Design Tokens**:
   Avoid absolute values (like `16px` or `#FF0000`). Instead use design token properties:
   ```css
   .new-section {
     padding: var(--space-3xl) 0;
     background-color: var(--light-gray);
     font-family: var(--font-sans);
   }
   ```
4. **Utilize Glassmorphic Design Utilities**:
   Wrap card structures with the `.glass-panel` layout backed by relative blur blobs (`.bg-blob`):
   ```html
   <div class="glass-panel">
      <h3>Interactive Card</h3>
      <p>Content goes here...</p>
   </div>
   ```
