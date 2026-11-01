# 🦋 Andean Morphia Jewelry — Full-Stack E-Commerce Roadmap & Spec

> **Master Technical Specification & Product Requirements Document (PRD)**
>
> **Brand Origin:** Cusco, Peru
>
> **Core Concept:** Gold and silver jewelry crafted as symbols of transformation, freedom, and rebirth, inspired by the ancestral strength of the Andes and the blue *Morphia* butterfly.
>
> **Currency:** Peruvian Sol (`PEN` / `S/`)
>
> **Language Rule:** All codebase variables, models, components, and documentation must be in **English**. All user-facing UI copy, storytelling, and database content must be in **Spanish**.

## 1. Brand Identity & Design System (Design Tokens)

This section translates the official Brand Manual guidelines into strict technical rules for Frontend development.

### 1.1. Color Palette (Normalized for Web Accessibility AA)

*(Technical Note: In the original Brand Manual, "Luminous Cream" and "Official White" shared the same hex code `#F8F2E4`. They are normalized below, alongside dark contrast tokens for typography legibility).*

| Tailwind Token | Manual Name | HEX Code | Primary UI Usage | 
| ----- | ----- | ----- | ----- | 
| `morphia-blue` | Pastel Light Blue (Primary) | `#C9D9E8` | Primary buttons (hover), badges, subtle borders, brand accents, and packaging highlights. | 
| `morphia-beige` | Beige (Secondary) | `#E6D8C3` | Secondary card backgrounds, dividers, manifesto sections, and active states. | 
| `morphia-cream` | Luminous Cream | `#F8F2E4` | Main application background (`bg-primary`), modals, and *Slide-over Cart*. | 
| `morphia-white` | Official White | `#FFFFFF` | Clean product card backgrounds (matching the white background of the `.png` product photos). | 
| `morphia-dark` | Andean Charcoal *(New)* | `#1E1E1C` | Primary color for headings (`DM Serif Display`) and body copy (`Montserrat`). | 
| `morphia-muted` | Soft Bronze *(New)* | `#6E655F` | Secondary text, subtitles, metadata, and input placeholders. | 
| `morphia-gold` | Gold Accent *(New)* | `#D4AF37` | Visual indicators exclusively for **Gold Collection (`ORO`)** pieces. | 
| `morphia-silver` | Silver Accent *(New)* | `#A8A9AD` | Visual indicators exclusively for **Silver Collection (`PLATA`)** pieces. | 

### 1.2. Typography Hierarchy (Google Fonts)

* **Primary Font (Editorial & Headings):** `'DM Serif Display', serif` (`font-serif`)
  * **Usage:** `h1`, `h2`, `h3`, manifesto quotes (*"La transformación es el arte de volver a brillar"*), and jewelry titles in detail views.
* **Secondary Font (UI & Body):** `'Montserrat', sans-serif` (`font-sans`)
  * **Imported Weights:** `300 (Light)`, `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`.
  * **Usage:** Navigation bar, product descriptions, prices (`PEN`), filters, buttons, and checkout forms.

### 1.3. Brand SVG & Static Assets Mapping

The official vector and product assets are placed in the repository under the following structure:

* **Brand Logos:**
  * `frontend/public/favicon.svg` $\rightarrow$ Browser tab icon linked in `index.html`.
  * `frontend/src/assets/brand/main-logo.svg` $\rightarrow$ Full primary logo (`ANDEAN MORPHIA JEWELRY`) for desktop Navbar and Footer.
  * `frontend/src/assets/brand/logo-am.svg` $\rightarrow$ Monogram variant (`AM JEWELRY`) for mobile Navbar and sticky scrolled header.
  * `frontend/src/assets/brand/logo-wings.svg` $\rightarrow$ Illustrated *Morphia* butterfly wings monogram for Storytelling, loading states, and packaging badges.
  * `frontend/src/assets/brand/minimalist-logo.svg` $\rightarrow$ Clean watermark and secondary UI branding.
* **Product Catalog Images (`frontend/public/products/`):**
  * `/products/chevron-ring.png`
  * `/products/claddagh-ring.png`
  * `/products/two-headed-snake-ring.png`
  * `/products/coral-ring.png`
  * `/products/snake-ring.png`
  * `/products/crown-ring.png`

### 1.4. Art Direction & Photo Grading Parameters

All product and lifestyle photography uploaded to the database or CDN must follow the Brand Manual grading parameters to preserve a warm, organic atmosphere:

* **Light:** Exposure `+10`, Brightness `+5`, Highlights `-25`, Shadows `+20`, Contrast `-5`.
* **Color & Detail:** Saturation `-5`, Vibrance `+8`, Warmth `+4`, Tint `+2`, Sharpness `+10`, Definition `+5`, Noise Reduction `+5`.

### 1.5. Official Contact & Social Channels

* **Email:** `andeanmorphiajewelry@gmail.com`
* **Instagram:** `@andeanmorphia.jewelry`
* **TikTok:** `@andeanmorphia`
* **Facebook:** `@andeanmorphia.jewelry`

---

## 2. Tech Stack & Monorepo Architecture

* **Monorepo Root:** `andean-morphia/`
* **Frontend (`/frontend`):** React 18+ (Vite), Tailwind CSS, React Router DOM v6, Lucide Icons, ESLint.
* **Backend (`/backend`):** Python 3.11+, Django 5+, Django REST Framework (DRF), `django-cors-headers`, `django-filter`.
* **Database:** PostgreSQL (Production) / SQLite (Local Development).
* **Deployment:** Render (Backend Web Service + PostgreSQL + Static Frontend).

---

## 3. Database Schema & Initial Seed Data (Backend)

### 3.1. Data Models (`catalog/models.py` & `orders/models.py`)

#### 1. `Category`
* `id` (AutoField)
* `name` (CharField): e.g., *Anillos, Collares y Dijes, Aretes, Pulseras*.
* `slug` (SlugField, unique)
* `description` (TextField, blank=True)

#### 2. `Product`
* `id` (UUIDField, primary_key=True)
* `category` (ForeignKey $\rightarrow$ `Category`)
* `name` (CharField)
* `slug` (SlugField, unique)
* `metal_type` (CharField, choices=`[('ORO', 'Oro'), ('PLATA', 'Plata')]`, default=`'PLATA'`)
* `short_description` (CharField): Craftsmanship and stone/shape details.
* `symbolic_meaning` (TextField): **Mandatory brand field.** Explains the transformation, Andean heritage, or personal evolution meaning behind the piece.
* `technical_details` (TextField): Metal purity (e.g., *Plata 950*), stones (e.g., *Marquesitas, Piedra Coral*), weight.
* `price` (DecimalField, max_digits=10, decimal_places=2) — Stored in **PEN (`S/`)**.
* `image_path` (CharField): Path to public asset (e.g., `/products/chevron-ring.png`).
* `stock` (PositiveIntegerField, default=5)
* `is_featured` (BooleanField, default=True)
* `is_active` (BooleanField, default=True)
* `created_at` / `updated_at` (DateTimeField)

#### 3. `Order` & `OrderItem`
* **`Order` Fields:** `id` (UUID), `order_number` (`AM-2026-XXXX`), `customer_full_name`, `customer_email`, `customer_phone`, `shipping_address`, `city` (*Cusco, Lima, etc.*), `gift_note`, `total_amount` (`PEN`), `status`, `payment_method`, `created_at`.
* **`OrderItem` Fields:** `order` (FK), `product` (FK), `quantity`, `unit_price`, `packaging_assigned`.
  * **Auto-calculated `packaging_assigned` on `save()`:**
    * If `product.metal_type == 'PLATA'`: *"Packaging Plata: Estuche gamuza celeste + Bolsa de organza + Tarjeta de agradecimiento y cuidado Plata"*.
    * If `product.metal_type == 'ORO'`: *"Packaging Oro: Estuche especial + Bolsa de organza + Tarjeta de agradecimiento y cuidado Oro"*.

### 3.2. Official Initial Catalog Seed Data (6 Real Products)

The backend seed command (`python manage.py seed_catalog`) must populate the database with these exact 6 rings under the **`Anillos` (`slug: 'anillos'`)** category:

| # | Image Path (`public/products/`) | Product Name (`name`) | Slug (`slug`) | Metal (`metal_type`) | Price (`PEN`) | Short Description & Technical Details | Symbolic Meaning (`symbolic_meaning`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `/products/chevron-ring.png` | **Anillo en punta** | `anillo-en-punta` | `PLATA` (Plata 950) | `90.00` | Anillo con forma semi triangular en punta con detalles labrados de inspiración ancestral en Plata 950. | Representa la dirección consciente, el ascenso hacia las cumbres andinas y la determinación en cada etapa de evolución personal. |
| **2** | `/products/claddagh-ring.png` | **Anillo corona corazón** | `anillo-corona-corazon` | `PLATA` (Plata 950) | `138.00` | Anillo en Plata 950 en forma de corazón coronado con finos acabados artesanales. | Símbolo de lealtad interior, amor propio y soberanía sobre nuestro propio camino de renacer y libertad emocional. |
| **3** | `/products/two-headed-snake-ring.png` | **Anillo dos cabezas de serpiente** | `anillo-dos-cabezas-de-serpiente` | `PLATA` (Plata 950) | `128.00` | Anillo abierto con dos cabezas de serpiente finamente detalladas en Plata 950. | Inspirado en la sabiduría ancestral andina (*Amaru*), simboliza la dualidad, el cambio de piel y la transformación profunda del ser. |
| **4** | `/products/coral-ring.png` | **Anillo con piedra coral** | `anillo-con-piedra-coral` | `PLATA` (Plata 950) | `226.00` | Anillo en Plata 950 engastado con marquesitas y piedra ovalada central en tono coral. | Conecta la energía vital de la naturaleza con la fortaleza interior; una pieza creada para recordar la belleza de volver a brillar. |
| **5** | `/products/snake-ring.png` | **Anillo de serpiente** | `anillo-de-serpiente` | `PLATA` (Plata 950) | `190.00` | Anillo envolvente en forma de serpiente trabajada artesanalmente en Plata 950. | Emblema de renovación continua, sanación y renacimiento, acompañando el proceso de soltar el pasado para evolucionar. |
| **6** | `/products/crown-ring.png` | **Anillo corona** | `anillo-corona` | `PLATA` (Plata 950) | `130.00` | Anillo en forma de corona clásica con incrustaciones de marquesitas en Plata 950. | Celebra la autenticidad, el empoderamiento y el reconocimiento de la luz propia tras cada proceso de transformación. |

### 3.3. REST API Endpoints

* `GET /api/v1/categories/` $\rightarrow$ List of active jewelry categories.
* `GET /api/v1/products/` $\rightarrow$ Catalog supporting filters: `?metal_type=ORO`, `?metal_type=PLATA`, `?category=anillos`.
* `GET /api/v1/products/<slug>/` $\rightarrow$ Full product detail + symbolic meaning + metal packaging rules.
* `POST /api/v1/orders/create/` $\rightarrow$ Atomic order creation (`transaction.atomic()`). Validates stock with `select_for_update()`, deducts inventory, and auto-assigns Silver/Gold packaging.

---

## 4. Frontend Architecture & User Experience (React)

### 4.1. Visual Style Guidelines (`soft-skill` + `minimalist-skill`)

* **Product Card Integration:** Since the 6 `.png` product photos have a clean white background showing the rings on dark velvet displays, product image containers must use `bg-morphia-white` (`#FFFFFF`) with soft rounded corners (`rounded-2xl`), generous inner padding (`p-6`), and a subtle border (`border-[#E6D8C3]/60`) so the photography blends seamlessly into the `#F8F2E4` cream page layout.
* **Currency Formatting:** Format all prices clearly as `S/ 90.00` or `PEN 90.00`.
* **Micro-interactions:** Smooth zoom and elevation on hover (`group-hover:scale-105 transition-transform duration-500 ease-out`).

### 4.2. Component Tree (`/frontend/src`)

```text
frontend/src/
├── assets/
│   └── brand/               # Official SVG logos (main-logo, logo-am, logo-wings, minimalist-logo)
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Sticky glassmorphism header, centered logo, cart badge
│   │   ├── Footer.jsx       # Brand manifesto snippet, Cusco origin, social links
│   │   └── SlideOverCart.jsx# Lateral cart drawer highlighting included Silver/Gold packaging
│   ├── home/
│   │   ├── HeroSection.jsx  # "Joyas que nos recuerdan la belleza de renacer" + CTA
│   │   ├── Manifesto.jsx    # Storytelling: Cusco + The Andes + Blue Morphia Butterfly
│   │   ├── FeaturedRings.jsx# Showcase of the 6 signature Plata 950 rings
│   │   ├── PackagingExp.jsx # Visual showcase of the pastel blue suede pouch, organza bag & care cards
│   │   └── InstaFeed.jsx    # Aesthetic grid inspired by @andeanmorphia.jewelry
│   ├── catalog/
│   │   ├── FilterBar.jsx    # Instant filters by Metal (Plata 950 / Oro) and Price
│   │   ├── ProductGrid.jsx  # Responsive grid (1 col mobile, 3 cols desktop)
│   │   └── ProductCard.jsx  # Clean white frame for the ring PNG + title + PEN price + Quick Add (+)
│   └── product/
│       └── SymbolicTabs.jsx # Accordion: 1. Significado Simbólico, 2. Cuidado Plata 950, 3. Packaging Incluido
├── context/
│   └── CartContext.jsx      # Global cart state persisted in localStorage
├── pages/
│   ├── HomePage.jsx
│   ├── CatalogPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CheckoutPage.jsx
│   └── OrderSuccessPage.jsx
└── services/
    └── api.js               # Fetch/Axios client connected to Django REST Framework
```

---

## 5. Sprint Execution Checklist

### Sprint 1: Backend Foundation & Real Catalog Seeding
* [x] Initialize monorepo directory structure (`/backend` and `/frontend`) and organize brand `.svg` assets.
* [x] Place the 6 product `.png` images inside `frontend/public/products/`.
* [x] Save updated `ROADMAP.md` in the root directory (`andean-morphia/ROADMAP.md`).
* [x] Set up Python virtual environment inside `/backend`, install Django, DRF, `django-cors-headers`, and `django-filter`.
* [x] Implement `Category`, `Product`, `Order`, and `OrderItem` models.
* [x] Create and run management command `python manage.py seed_catalog` to load the 6 Plata 950 rings (`chevron-ring.png`, `claddagh-ring.png`, `two-headed-snake-ring.png`, `coral-ring.png`, `snake-ring.png`, `crown-ring.png`) with their exact PEN prices.

### Sprint 2: REST API & Transactional Integrity
* [x] Build DRF Serializers and catalog endpoints (`/api/v1/products/`).
* [x] Build `POST /api/v1/orders/create/` using `transaction.atomic()` and `select_for_update()`.
* [x] Verify all endpoints with automated tests.

### Sprint 3: Design System & Public Views (Frontend)
* [ ] Install Tailwind CSS, `react-router-dom`, and `lucide-react` inside `/frontend`.
* [ ] Configure Tailwind with the `morphia-*` color tokens and Google Fonts (`DM Serif Display` & `Montserrat`).
* [ ] Build `Navbar`, `Footer`, `HeroSection`, and `CatalogPage` displaying the 6 rings with `PEN` pricing.
* [ ] Build `ProductDetailPage` highlighting the transformation storytelling and Plata 950 packaging preview.

### Sprint 4: Shopping Cart, Checkout & Order Flow
* [ ] Implement `CartContext` and `SlideOverCart` displaying the automatic *"Packaging Plata"* badge.
* [ ] Build `CheckoutPage` and connect it to `POST /api/v1/orders/create/`.

### Sprint 5: QA Audit, SEO & Production Deployment
* [ ] Audit contrast ratios, responsive layout, and configure `favicon.svg` + SEO metadata in `index.html`.
* [ ] Deploy full-stack application to Render.