# Ciclo de Desenvolvimento e Evolução — Design System
### Grupo Águia Branca · Divisão Comércio (80 anos)

A design system for the **Ciclo de Desenvolvimento e Evolução** — a web application for performance management and PDI (Plano de Desenvolvimento Individual). It serves the **People & Gestão** area with a split-view architecture: a **Dashboard** for the gestão to consolidate and track data, and **isolated self-assessment forms** that collaborators open through unique links. The product supports a journey of reflection, technical PDI, and behavioral PDI.

Built on the **Manual de Marca & Identidade Visual 2025** of the Divisão Comércio (Grupo Águia Branca).

---

## Sources provided
Everything here was derived from materials supplied by the user (paths are originals, kept for reference — do not assume the reader has access):

- `uploads/gab-identidade-visual (3).skill` — the official brand bible (palette, typography, logo rules, tone of voice, signature bar). **Primary source of truth for the brand.**
- `uploads/ciclo_desenvolvimento.html` — a working reference build of the app. Source of truth for **structure and flows** (Dashboard / Colaboradores / Form Gestor / Form Colaborador via link / comparison modal).
- `uploads/Ciclo de Desenvolvimento e Evolução.xlsx` — the canonical cycle form. Two sheets: *Manual* (how to answer) and *Ciclo* (the questionnaire). **Source of truth for the question sequence**, reproduced faithfully in the form screens.
- `uploads/Orientações Ciclo.pdf` — orientation copy for collaborators ("preencha os tópicos em amarelo", competências técnicas vs comportamentais).
- `uploads/Logo_Divisão_Comércio_80_ANOS_{Colorida,Branca,Preta}.png` — the three official logo lockups (copied into `assets/`).

---

## CONTENT FUNDAMENTALS — how copy is written
- **Language:** Brazilian Portuguese, always.
- **Tone:** professional, clear, objective — *"próxima, simples, do dia a dia, assertiva"* and *"engajadora"*. Corporate seriousness with a welcoming note for the development journey.
- **Person:** the app speaks **to "você"** in collaborator-facing surfaces (*"Olá, Ana! Preencha sua autopercepção."*, *"O que você tem de bom?"*). Management surfaces are neutral/labelled (*"Percepção do Líder"*, *"Controle Unificado"*).
- **Casing:** section banners and field labels are **UPPERCASE** (e.g. `NOME DO COLABORADOR`, `JORNADA DE REFLEXÃO E EVOLUÇÃO`). Body copy is sentence case. Per the manual: títulos com a primeira palavra em maiúsculo; nomes próprios, cargos e áreas começam com maiúscula.
- **Section vocabulary (verbatim from the spreadsheet):** Jornada de Reflexão e Evolução · Retrospectiva · Foco no Futuro · PDI Técnico · PDI Comportamental · Melhoria Acordada · Conexão Líder · Alvo a ser Atingido · Percepção do Líder / Percepção do Liderado.
- **Table headers:** Ação · Desdobramento da Ação · Evidência (como vamos observar que vc atingiu o objetivo) · Data Acordada.
- **Status vocabulary:** Completo · Parcial · Pendente (plus granular *Aguardando Colaborador* / *Aguardando Gestor*).
- **Emoji:** **not part of the brand.** The reference HTML used emoji; this system replaces them with a clean line-icon set (Lucide — see Iconography). Do not introduce emoji.
- **Dates/times:** `01/08/2025`, `01/08/25`, `01/jul`; `12h`, `12h30`.

---

## VISUAL FOUNDATIONS

### Colors
The official palette (`tokens/colors.css`):
- **Azul Escuro `#0F4B87`** — institutional: headers, titles, table headers, primary buttons.
- **Azul Claro `#0F7CB9`** — corporate Divisão Comércio: links, focus rings, "feedback" role, accents.
- **Laranja `#FF931E`** — highlights and CTAs; the Divisão Comércio signal color. The active nav tab, the "Adicionar Ação" affordance, and the **Data Acordada** column all use it.
- **Cinza `#E6E6E4`** — neutral fills / secondary.
- **Neutrals** — a clean corporate gray ramp from `--ab-gray-50` (app canvas) to `--ab-gray-900` (primary text). Brand body gray is `#585858` (R88 G88 B88), used for paragraph copy.

**Role legend** maps the three brand colors to the three perspectives: **Gestor/Líder = Azul Escuro**, **Liderado/Colaborador = Laranja** (the "campos em amarelo/laranja" the collaborator fills), **Feedback = Azul Claro**.

**Status colors** are built *from the brand palette* rather than a generic traffic light: **Completo = azul**, **Parcial = laranja**, **Pendente = cinza**. (See Caveats — a green/amber/red variant is easy to switch on if preferred.)

### Typography
- Institutional family **Helvetica** (all weights); brand-sanctioned digital fallback **Arial**. We use the native stack `"Helvetica Neue", Helvetica, Arial, sans-serif` — no webfont download, fully brand-compliant. No fancy display face; the neutral grotesque *is* the brand.
- Scale: display 30 / h1 22 / h2 18 / h3 15 / body 14 / body-sm 13 / label 11 / stat 32. Uppercase labels carry `0.06em` tracking.

### Layout, shape & elevation
- **Cards:** white surface, `10px` radius, `1px` `--ab-gray-200` border, light `--shadow-sm`. Optional uppercase azul-escuro **title with a 2px laranja underline**, and an optional colored **left spine** to mark a role (gestor/colab/feedback) or accent.
- **Radii:** controls `6–8px`, cards `10px`, modals `14px`, pills `999px`.
- **Spacing:** 4px base unit; generous "respiro" (white space) per the manual. Content max-width `1100px`; header height `56px`.
- **Shadows:** deliberately light (tinted azul); modals get the only pronounced shadow. The manual forbids heavy filters on the logo — UI elevation stays subtle to match.
- **Signature detail:** the app header is azul escuro with a **thin laranja rule** along its bottom edge — echoing the comunicado template's "faixa inferior laranja".

### Motion & states
- Short, calm transitions (`0.15–0.22s`, ease `cubic-bezier(0.2,0,0.2,1)`); **no bounce, no decorative loops**.
- **Hover:** buttons darken to the `-hover` token; secondary/ghost fill in; table rows tint to `--surface-brand-soft` (azul claro 50).
- **Focus:** azul-claro ring (`--shadow-focus`) + white field background.
- **Press/active:** color shift only (no shrink), keeping it corporate.

### Backgrounds & imagery
- No gradients, no photographic backgrounds, no textures. Flat neutral canvas (`--ab-gray-50`) with white cards. This is intentional: clean, organized, "sério mas acolhedor".
- Transparency/blur used only for the modal overlay (`rgba(8,42,77,0.55)`).

---

## ICONOGRAPHY
- The brand has **no proprietary icon font**. The reference build used emoji, which conflicts with the corporate-clean direction.
- **Substitution (flagged):** this system uses **[Lucide](https://lucide.dev)** — a modern, 2px-stroke open-source line set — loaded from CDN (`unpkg.com/lucide`). Usage in the UI kit is via a small `Icon` wrapper (`ui_kits/ciclo/helpers.jsx`) or `<i data-lucide="name">`. Common glyphs: `layout-dashboard`, `users`, `clipboard-list`, `target`, `link`, `search`, `eye`, `save`, `check-circle-2`, `circle-dashed`, `wrench`, `brain`, `refresh-cw`, `trending-up`, `handshake`.
- **Logos** live in `assets/` — use `logo-branca.png` on azul-escuro/dark surfaces (header, hero), `logo-colorida.png` on white/print, `logo-preta.png` for monochrome. Respect the manual's rules: never distort, rotate, recolor, add shadows, or place over photos; keep 2× clear space.
- If a different icon set is preferred, swap the CDN link and the `data-lucide` names. **Confirm the icon direction with the user.**

---

## INDEX — what's in this folder

**Foundations**
- `styles.css` — global entry point (consumers link this). `@import`s only.
- `tokens/colors.css` · `tokens/typography.css` · `tokens/layout.css` · `tokens/base.css`
- `guidelines/*.card.html` — specimen cards (Colors, Type, Spacing, Brand).

**Components** (`components/<group>/` — React primitives, each with `.jsx` + `.d.ts` + `.prompt.md`, one card per group):
- `forms/` — **Button**, **TextField** / **DateField**, **TextArea** (expansível), **Select**, **Field** / **FormGrid**
- `display/` — **MetricCard**, **StatusBadge**, **Avatar**, **ProgressBar**, **Banner**, **Legend** / **RoleTag**
- `layout/` — **AppHeader**, **Card**, **SectionTitle**
- `data/` — **DataTable** / **FilterBar**, **DualPane** / **Pane**, **PdiTable**, **LinkBox**
- `feedback/` — **Modal**, **Toast** (+ `useToast`)

**UI kit** (`ui_kits/ciclo/`): the full interactive app — `index.html` (entry), `App.jsx`, `DashboardScreen.jsx`, `ColaboradoresScreen.jsx`, `FormGestorScreen.jsx`, `FormColaboradorScreen.jsx`, `ComparisonModal.jsx`, `data.js` (mock), `helpers.jsx`.

**Assets** (`assets/`): `logo-colorida.png`, `logo-branca.png`, `logo-preta.png`.

`SKILL.md` — Agent-Skills-compatible entry so this system can be used as a downloadable skill.

---

### Using the components
Link `styles.css`, load `_ds_bundle.js` (auto-generated), then read components off the namespace:
```js
const { Button, Card, PdiTable } = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
```
