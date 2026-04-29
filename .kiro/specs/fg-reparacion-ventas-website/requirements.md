# Requirements Document

## Introduction

Sitio web profesional completo para **F&G Reparación y Ventas**, empresa especializada en venta y reparación de electrodomésticos (neveras, lavadoras, secadoras, estufas, aires acondicionados) y servicios eléctricos domiciliarios con más de 15 años de experiencia operando en Estados Unidos.

El sitio combina una presencia pública de alto impacto visual orientada a conversión, con un panel de administración privado para gestión de contenido y productos. Soporta tres idiomas (ES/EN/FR) y se despliega en Netlify con backend en Firebase.

## Glossary

- **Website**: El sitio web completo de F&G Reparación y Ventas
- **Navbar**: Barra de navegación fija en la parte superior de todas las páginas públicas
- **Hero**: Sección principal de la página de inicio con imagen de fondo, título animado y CTAs
- **CTA**: Call-to-action, botón o enlace que invita al usuario a realizar una acción
- **Admin**: Panel de administración privado accesible en `/admin/dashboard`
- **Admin_User**: Usuario autenticado con Firebase Auth que tiene acceso al panel de administración
- **Visitor**: Usuario no autenticado que navega el sitio público
- **Product**: Electrodoméstico disponible para venta, almacenado en Firestore colección `products`
- **Service**: Servicio ofrecido por la empresa (reparación, mantenimiento, eléctrico)
- **Settings**: Configuración editable del sitio almacenada en Firestore colección `settings`
- **Firestore**: Base de datos Firebase Firestore usada para productos y configuración
- **Firebase_Auth**: Servicio de autenticación de Firebase
- **Firebase_Storage**: Servicio de almacenamiento de archivos de Firebase para imágenes
- **i18n**: Sistema de internacionalización implementado con i18next (ES/EN/FR)
- **Locale**: Idioma activo seleccionado por el Visitor (es, en, fr)
- **WhatsApp_CTA**: Enlace que abre WhatsApp con un mensaje predefinido al número de la empresa
- **Brands_Carousel**: Carrusel horizontal infinito con logos de marcas de electrodomésticos
- **Router**: React Router DOM que gestiona las rutas del sitio
- **Netlify**: Plataforma de despliegue del sitio
- **Vite**: Herramienta de build y servidor de desarrollo
- **Framer_Motion**: Librería de animaciones para React
- **Tailwind**: Framework de estilos CSS utility-first

---

## Requirements

### Requirement 1: Estructura de Rutas y Navegación

**User Story:** As a Visitor, I want to navigate between the main sections of the website, so that I can find information about services, products, and contact details easily.

#### Acceptance Criteria

1. THE Router SHALL expose the following public routes: `/` (home), `/servicios`, `/productos`, `/contacto`.
2. THE Router SHALL expose the following protected routes: `/admin` (login), `/admin/dashboard`.
3. WHEN a Visitor accesses `/admin/dashboard` without an active Firebase_Auth session, THE Router SHALL redirect the Visitor to `/admin`.
4. WHEN a Visitor navigates between routes, THE Website SHALL display a fade transition animation between pages using Framer_Motion.
5. THE Navbar SHALL be visible and fixed at the top on all public routes.
6. WHEN the Visitor scrolls down more than 50px, THE Navbar SHALL apply a glass/blur background effect.
7. WHEN the page loads, THE Navbar SHALL animate with a slide-down entrance using Framer_Motion.

---

### Requirement 2: Navbar y Selector de Idioma

**User Story:** As a Visitor, I want a clear navigation bar with language selection, so that I can access all sections and browse the site in my preferred language.

#### Acceptance Criteria

1. THE Navbar SHALL display the F&G logo on the left side.
2. THE Navbar SHALL display navigation links: Inicio, Servicios, Productos, Marcas, Contacto.
3. THE Navbar SHALL display a "Consúltanos" CTA button that opens a WhatsApp_CTA link in a new tab.
4. THE Navbar SHALL display a language selector with flags for ES 🇨🇴, EN 🇺🇸, and FR 🇫🇷.
5. WHEN the Visitor selects a Locale from the language selector, THE i18n SHALL update all visible text to the selected Locale immediately.
6. WHEN the Visitor selects a Locale, THE Website SHALL persist the selected Locale in localStorage so it is restored on the next visit.
7. THE Navbar SHALL be fully responsive and display a hamburger menu on screens narrower than 768px.
8. WHEN the Visitor clicks the hamburger menu, THE Navbar SHALL display a full-width mobile menu with all navigation links.

---

### Requirement 3: Hero Section

**User Story:** As a Visitor, I want an impactful hero section, so that I immediately understand what the company does and feel confident contacting them.

#### Acceptance Criteria

1. THE Hero SHALL display a full-viewport-height background image of the business with a dark overlay of 55% opacity.
2. THE Hero SHALL display an animated main title: "Expertos en Electrodomésticos con Más de 15 Años de Experiencia" (translated per active Locale).
3. WHEN the Hero mounts, THE Hero SHALL animate the title with a fade and slide-up entrance using Framer_Motion.
4. WHEN the Hero mounts, THE Hero SHALL animate the CTA buttons with a pop-in effect with staggered delay using Framer_Motion.
5. THE Hero SHALL display two CTA buttons: "Ver Servicios" (scrolls to services section) and "Contáctanos por WhatsApp" (opens WhatsApp_CTA).
6. THE Hero SHALL display four animated counters: "15+ Años", "500+ Clientes", "1000+ Reparaciones", "100% Garantía".
7. WHEN the counters enter the viewport, THE Hero SHALL animate each counter with a count-up effect using Framer_Motion and an Intersection Observer.

---

### Requirement 4: Sección de Servicios (Home Preview y Página /servicios)

**User Story:** As a Visitor, I want to see the services offered with clear descriptions, so that I can identify which service I need and contact the company directly.

#### Acceptance Criteria

1. THE Website SHALL display a services preview section on the home page with cards for the following six services: Reparación de Neveras, Reparación de Lavadoras y Secadoras, Reparación de Estufas, Mantenimiento de Aire Acondicionado, Servicios Eléctricos Domiciliarios, Mantenimiento Preventivo.
2. EACH service card SHALL display an SVG icon, a title, a short description, and a "Consúltanos" WhatsApp_CTA button with a predefined message identifying the service.
3. WHEN the service cards enter the viewport, THE Website SHALL animate them with a stagger fade-in effect using Framer_Motion.
4. WHEN a Visitor hovers over a service card, THE Website SHALL apply a lift effect with a coral shadow using Framer_Motion.
5. THE `/servicios` route SHALL display all six services with expanded descriptions and the same card design.
6. ALL service card text SHALL be translated according to the active Locale via i18n.

---

### Requirement 5: Sección ¿Por Qué Elegirnos?

**User Story:** As a Visitor, I want to see the company's differentiators, so that I feel confident choosing F&G over competitors.

#### Acceptance Criteria

1. THE Website SHALL display a "¿Por Qué Elegirnos?" section on the home page with exactly 7 differentiating points.
2. THE section SHALL use a dark gradient background (`#0F172A`).
3. WHEN the differentiating points enter the viewport, THE Website SHALL animate them with a stagger slide-in from the left using Framer_Motion.
4. ALL text in this section SHALL be translated according to the active Locale via i18n.

---

### Requirement 6: Carrusel de Marcas

**User Story:** As a Visitor, I want to see the brands the company works with, so that I know they handle my appliance's brand.

#### Acceptance Criteria

1. THE Brands_Carousel SHALL display logos for the following brands: Samsung, LG, Whirlpool, GE, Maytag, Frigidaire, Bosch, KitchenAid, Electrolux, Amana, Speed Queen, Haier.
2. THE Brands_Carousel SHALL scroll horizontally in an infinite loop without user interaction.
3. THE Brands_Carousel SHALL duplicate the logo list to create a seamless infinite scroll effect using CSS animation or Framer_Motion.
4. WHEN a Visitor hovers over the Brands_Carousel, THE Brands_Carousel SHALL pause the scrolling animation.

---

### Requirement 7: Sección de Productos (Home Preview y Página /productos)

**User Story:** As a Visitor, I want to browse available products with prices and images, so that I can find what I need and contact the company to purchase.

#### Acceptance Criteria

1. THE Website SHALL display a products preview section on the home page showing the 6 most recently added Products from Firestore.
2. EACH product card SHALL display an image loaded from Firebase_Storage, a name, a short description, a price, and a WhatsApp_CTA button.
3. WHEN the product grid enters the viewport, THE Website SHALL animate the cards with a stagger fade-in using Framer_Motion.
4. THE `/productos` route SHALL display all Products from Firestore in a responsive grid.
5. THE `/productos` route SHALL display a category filter that filters the product grid in real time without a page reload.
6. THE `/productos` route SHALL display a search input that filters products by name and description in real time.
7. WHEN no products match the active filter or search query, THE `/productos` route SHALL display a friendly empty-state message with an illustration.
8. THE `/productos` route SHALL implement infinite scroll or pagination to load products in batches of 12.
9. IF Firestore returns an error when loading products, THEN THE Website SHALL display a user-friendly error message and a retry button.

---

### Requirement 8: Sección de Ubicación y Contacto

**User Story:** As a Visitor, I want to see the company's location and contact information, so that I can visit or reach them easily.

#### Acceptance Criteria

1. THE Website SHALL display a location section on the home page with an embedded Google Maps iframe showing the company's address.
2. THE Website SHALL display the company address, business hours, and phone number in the location section.
3. THE business hours displayed SHALL be loaded from the `settings` Firestore collection so they are editable by the Admin_User.
4. THE `/contacto` route SHALL display a contact form with fields: name, email, phone, message, and a submit button.
5. WHEN a Visitor submits the contact form with all required fields filled, THE Website SHALL send the form data and display a success confirmation message.
6. IF a Visitor submits the contact form with one or more required fields empty, THEN THE Website SHALL display inline validation error messages without submitting the form.
7. THE `/contacto` route SHALL display the same embedded map and contact details as the home location section.

---

### Requirement 9: Footer

**User Story:** As a Visitor, I want a complete footer with quick links and social media, so that I can navigate the site and connect with the company on other platforms.

#### Acceptance Criteria

1. THE Footer SHALL display the F&G logo and company slogan.
2. THE Footer SHALL display quick navigation links to all public routes.
3. THE Footer SHALL display clickable social media icons (Facebook, Instagram, YouTube).
4. THE Footer SHALL display a clickable WhatsApp_CTA link with the company phone number.
5. THE Footer SHALL display a copyright notice with the current year.
6. ALL Footer text SHALL be translated according to the active Locale via i18n.

---

### Requirement 10: Internacionalización (i18next)

**User Story:** As a Visitor, I want to read the entire website in Spanish, English, or French, so that I can understand the content in my preferred language.

#### Acceptance Criteria

1. THE i18n SHALL support three locales: `es` (Spanish), `en` (English), `fr` (French).
2. THE Website SHALL load translation strings from `/src/locales/es.json`, `/src/locales/en.json`, and `/src/locales/fr.json`.
3. THE i18n SHALL default to `es` if no Locale is stored in localStorage and the browser language is not `en` or `fr`.
4. WHEN the Visitor changes the Locale, THE Website SHALL update all translated strings on the current page without a full page reload.
5. THE i18n SHALL persist the selected Locale in localStorage under the key `fg_locale`.
6. WHERE a Product or Service has multilingual content stored in Firestore as `{ es: "...", en: "...", fr: "..." }`, THE Website SHALL display the field value matching the active Locale.

---

### Requirement 11: Panel de Administración — Autenticación

**User Story:** As an Admin_User, I want to log in securely, so that I can manage the website content without unauthorized access.

#### Acceptance Criteria

1. THE `/admin` route SHALL display a login form with email and password fields and a submit button.
2. WHEN an Admin_User submits valid credentials, THE Firebase_Auth SHALL authenticate the session and THE Router SHALL redirect to `/admin/dashboard`.
3. IF an Admin_User submits invalid credentials, THEN THE Website SHALL display an error message below the login form without redirecting.
4. WHEN an authenticated Admin_User navigates to `/admin`, THE Router SHALL redirect to `/admin/dashboard`.
5. THE `/admin/dashboard` route SHALL display a logout button that signs out the Admin_User via Firebase_Auth and redirects to `/admin`.
6. WHILE an Admin_User session is active, THE Website SHALL protect all `/admin/dashboard` sub-routes from unauthenticated access.

---

### Requirement 12: Panel de Administración — Gestión de Productos

**User Story:** As an Admin_User, I want to create, edit, and delete products, so that the product catalog on the website is always up to date.

#### Acceptance Criteria

1. THE Admin dashboard SHALL display a product management section listing all Products from Firestore.
2. THE Admin dashboard SHALL provide a form to create a new Product with fields: name (ES/EN/FR), description (ES/EN/FR), price, category, and image upload.
3. WHEN an Admin_User uploads an image for a Product, THE Website SHALL upload the file to Firebase_Storage and store the resulting URL in the Product Firestore document.
4. WHEN an Admin_User saves a new Product, THE Firestore SHALL create a new document in the `products` collection with a server-generated timestamp in the `createdAt` field.
5. THE Admin dashboard SHALL provide an edit form pre-populated with existing Product data for each listed Product.
6. WHEN an Admin_User saves edits to a Product, THE Firestore SHALL update the corresponding document in the `products` collection.
7. WHEN an Admin_User deletes a Product, THE Firestore SHALL delete the corresponding document and THE Firebase_Storage SHALL delete the associated image file.
8. IF a Firestore or Firebase_Storage operation fails during product management, THEN THE Admin dashboard SHALL display a descriptive error message.

---

### Requirement 13: Panel de Administración — Edición de Contenido del Sitio

**User Story:** As an Admin_User, I want to edit the website's dynamic content from the dashboard, so that I can keep information current without modifying code.

#### Acceptance Criteria

1. THE Admin dashboard SHALL provide editable fields for: WhatsApp number, Hero title (ES/EN/FR), Hero subtitle (ES/EN/FR), counter values, map embed URL, business hours, and social media links.
2. WHEN an Admin_User saves changes to Settings, THE Firestore SHALL update the corresponding fields in the `settings` collection document.
3. THE Admin dashboard SHALL display a "Ver sitio" button that opens the public home page in a new tab.
4. WHEN the public Website loads a Settings field, THE Website SHALL read the value from the `settings` Firestore collection and display it.
5. IF the `settings` Firestore document does not exist on first load, THEN THE Website SHALL display hardcoded default values for all Settings fields.

---

### Requirement 14: Rendimiento y Accesibilidad

**User Story:** As a Visitor, I want the website to load quickly and be accessible, so that I have a smooth experience regardless of my device or abilities.

#### Acceptance Criteria

1. THE Website SHALL implement route-based code splitting using React lazy and Suspense so each route is loaded as a separate chunk.
2. THE Website SHALL apply lazy loading to all Product and Service images using the `loading="lazy"` attribute or an Intersection Observer.
3. ALL images in the Website SHALL include descriptive `alt` text attributes.
4. THE Website SHALL maintain a color contrast ratio of at least 4.5:1 between text and background for all primary text elements, consistent with the defined color palette.
5. ALL interactive elements (buttons, links, inputs) SHALL have a visible focus indicator.
6. THE Website SHALL be designed mobile-first and SHALL be fully usable on screens from 320px to 1920px wide.
7. THE Vite build SHALL produce a production bundle without errors when running `npm run build`.
8. THE Website SHALL run without console errors when started with `npm run dev`.

---

### Requirement 15: Configuración de Despliegue y Variables de Entorno

**User Story:** As a developer, I want the project to be ready to deploy on Netlify with documented environment variables, so that setup is straightforward and reproducible.

#### Acceptance Criteria

1. THE project root SHALL contain a `netlify.toml` file with the build command `npm run build`, publish directory `dist`, and a redirect rule `/* /index.html 200` for SPA routing.
2. THE project root SHALL contain a `.env.example` file listing all required environment variables with descriptive comments and no real values.
3. THE required environment variables SHALL include: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_GOOGLE_MAPS_EMBED_URL`, `VITE_WHATSAPP_NUMBER`.
4. THE project root SHALL contain a `README.md` with setup instructions covering: cloning the repo, installing dependencies, configuring `.env`, Firebase project setup, and Netlify deployment steps.
5. THE Website SHALL read all Firebase and external service configuration exclusively from environment variables prefixed with `VITE_`.
