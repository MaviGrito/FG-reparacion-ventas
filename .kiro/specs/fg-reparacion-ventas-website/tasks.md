# Implementation Plan: F&G Reparación y Ventas — Website

## Overview

Implementación incremental de la SPA React + TypeScript + Vite. Se comienza con el scaffolding del proyecto y la infraestructura base (Firebase, i18n, router), luego se construyen las secciones públicas de mayor impacto visual, después el catálogo de productos, el formulario de contacto, y finalmente el panel de administración. Cada bloque termina con un checkpoint de tests.

---

## Tasks

- [x] 1. Scaffolding del proyecto y configuración base
  - Inicializar proyecto con `npm create vite@latest` usando template `react-ts`
  - Instalar dependencias: `tailwindcss`, `framer-motion`, `react-router-dom`, `i18next`, `react-i18next`, `firebase`, `fast-check`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`
  - Configurar `tailwind.config.ts` con la paleta de colores (`primary: #E85D26`, `dark: #0F172A`, `light: #F8FAFC`, `text: #1E293B`) y la fuente Poppins
  - Crear `netlify.toml` con build command, publish dir `dist` y redirect `/* /index.html 200`
  - Crear `.env.example` con todas las variables `VITE_*` documentadas
  - Crear `README.md` con instrucciones de setup, Firebase y Netlify
  - Configurar `vitest.config.ts` con environment `jsdom` y setup file
  - _Requirements: 14.1, 15.1, 15.2, 15.3, 15.4_

- [x] 2. Tipos, modelos de datos y configuración Firebase/i18n
  - [x] 2.1 Definir tipos TypeScript en `src/types/`
    - Crear `Product`, `ProductCategory`, `Settings`, `Counter`, `Locale`, `Brand` en `src/types/index.ts`
    - _Requirements: 7.1, 12.2, 13.1_
  - [x] 2.2 Inicializar Firebase en `src/lib/firebase.ts`
    - Leer todas las variables desde `import.meta.env.VITE_*`
    - Exportar `db`, `auth`, `storage`
    - _Requirements: 15.5_
  - [x] 2.3 Configurar i18next en `src/lib/i18n.ts`
    - Detectar locale desde `localStorage` bajo la clave `fg_locale`; fallback a `'es'` si el browser language no es `en` ni `fr`
    - Crear archivos `src/locales/es.json`, `en.json`, `fr.json` con todas las claves necesarias (nav, hero, services, whyUs, products, contact, footer, admin, errors)
    - _Requirements: 10.1, 10.2, 10.3, 10.5_
  - [ ]* 2.4 Escribir property test — Property 1: Locale persistence round-trip
    - **Property 1: Locale persistence round-trip**
    - **Validates: Requirements 10.5, 2.6**
    - Usar `fc.constantFrom('es','en','fr')`, simular selección y recarga, verificar `localStorage.getItem('fg_locale') === locale`
  - [ ]* 2.5 Escribir property test — Property 2: Locale default fallback
    - **Property 2: Locale default fallback**
    - **Validates: Requirements 10.3**
    - Entornos sin `fg_locale` en localStorage y browser language distinto de `en`/`fr`; verificar `resolveLocale() === 'es'`
  - [ ]* 2.6 Escribir property test — Property 3: Multilingual field resolution
    - **Property 3: Multilingual field resolution**
    - **Validates: Requirements 10.6**
    - Usar `fc.record({ es: fc.string({minLength:1}), en: fc.string({minLength:1}), fr: fc.string({minLength:1}) })` + `fc.constantFrom('es','en','fr')`; verificar que el valor retornado no sea `undefined` ni vacío

- [x] 3. Servicios de acceso a datos y hooks base
  - [x] 3.1 Implementar `src/services/firestoreService.ts`
    - Funciones: `getProducts()`, `getProductById()`, `createProduct()`, `updateProduct()`, `deleteProduct()`, `getSettings()`, `updateSettings()`
    - Manejo de errores con `try/catch` en todas las operaciones
    - _Requirements: 7.1, 12.4, 12.6, 12.7, 13.2, 13.4_
  - [x] 3.2 Implementar `src/services/storageService.ts`
    - Funciones: `uploadProductImage(file, productId)`, `deleteProductImage(url)`
    - Rollback del documento Firestore si el upload falla
    - _Requirements: 12.3, 12.7_
  - [x] 3.3 Implementar `src/services/authService.ts`
    - Funciones: `signIn(email, password)`, `signOut()`, `onAuthStateChanged(callback)`
    - Mapeo de códigos de error Firebase Auth a mensajes legibles en español
    - _Requirements: 11.2, 11.3, 11.5_
  - [x] 3.4 Implementar hooks: `useAuth`, `useProducts`, `useSettings`
    - `useAuth`: expone `user`, `loading`, `error`
    - `useProducts`: expone `products`, `loading`, `error`, `retry`
    - `useSettings`: expone `settings` (con defaults hardcodeados si Firestore no responde), `loading`, `error`
    - _Requirements: 7.9, 13.5_
  - [ ]* 3.5 Escribir property test — Property 8: Settings fallback invariant
    - **Property 8: Settings fallback invariant**
    - **Validates: Requirements 13.5**
    - Mockear Firestore para que devuelva documento inexistente; verificar que todos los campos de Settings sean sus valores default y no `undefined`

- [x] 4. Router, layout base y componentes comunes
  - [x] 4.1 Implementar `src/router/AppRouter.tsx` y `ProtectedRoute`
    - Lazy loading de todas las páginas con `React.lazy` + `<Suspense fallback={<Spinner />}>`
    - `ProtectedRoute` verifica `Firebase_Auth.currentUser`; redirige a `/admin` si es `null`
    - _Requirements: 1.1, 1.2, 1.3, 14.1_
  - [ ]* 4.2 Escribir property test — Property 7: Protected route invariant
    - **Property 7: Protected route invariant**
    - **Validates: Requirements 1.3, 11.6**
    - Simular `currentUser === null` para cualquier intento de navegación a `/admin/dashboard`; verificar redirect a `/admin` y que el dashboard no se renderice
  - [x] 4.3 Implementar componentes comunes: `Button`, `Card`, `Spinner`, `ErrorBoundary`
    - `ErrorBoundary` global envuelve la app en `main.tsx`
    - `Spinner` usado como fallback de Suspense y en estados de carga
    - _Requirements: 14.1_
  - [x] 4.4 Implementar `PageTransition` con Framer Motion
    - Animación fade entre rutas usando `AnimatePresence` en el router
    - _Requirements: 1.4_
  - [x] 4.5 Implementar `Navbar`
    - Logo F&G a la izquierda, links de navegación, botón "Consúltanos" (WhatsApp), selector de idioma con banderas
    - `useScrollPosition` hook: activa glass/blur al superar 50px de scroll
    - Hamburger menu con estado local `isOpen` para mobile (< 768px)
    - Animación slide-down al montar con Framer Motion
    - _Requirements: 1.5, 1.6, 1.7, 2.1, 2.2, 2.3, 2.4, 2.5, 2.7, 2.8_
  - [x] 4.6 Implementar `Footer`
    - Logo, slogan, links de navegación, iconos de redes sociales, WhatsApp CTA, copyright con año dinámico
    - Todas las cadenas traducidas vía i18n
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 5. Checkpoint — Verificar estructura base
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Sección Hero
  - [x] 6.1 Implementar componente `Hero`
    - Imagen de fondo desde Unsplash (`photo-1581092918056-0c4c3acd3789?w=1920&q=80`) con overlay CSS negro al 55%
    - Título animado con fade + slide-up (Framer Motion) al montar
    - Dos CTAs: "Ver Servicios" (scroll a sección) y "Contáctanos por WhatsApp" (link externo)
    - Animación pop-in con stagger en los botones CTA
    - Título y subtítulo leídos desde `useSettings()` con fallback a texto hardcodeado
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [x] 6.2 Implementar contadores animados en Hero
    - Cuatro contadores: "15+ Años", "500+ Clientes", "1000+ Reparaciones", "100% Garantía"
    - `useInView` + `useMotionValue` para efecto count-up al entrar en viewport
    - _Requirements: 3.6, 3.7_

- [x] 7. Sección de Servicios
  - [x] 7.1 Implementar `ServiceCard` y `ServicesGrid`
    - Cada card: imagen Unsplash (según tabla del design), ícono SVG, título, descripción corta, botón "Consúltanos" con mensaje WhatsApp predefinido por servicio
    - Animación stagger fade-in al entrar en viewport
    - Efecto lift con sombra coral en hover (Framer Motion)
    - Imágenes con `loading="lazy"` y `alt` descriptivo
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 14.2, 14.3_
  - [x] 7.2 Implementar página `/servicios`
    - Reutiliza `ServicesGrid` con las 6 cards y descripciones expandidas
    - Todas las cadenas traducidas vía i18n
    - _Requirements: 4.5, 4.6_

- [x] 8. Sección ¿Por Qué Elegirnos?
  - [x] 8.1 Implementar componente `WhyUs`
    - Fondo degradado oscuro `#0F172A`
    - Layout de dos columnas en desktop: 7 puntos diferenciadores a la izquierda, imagen de técnico (Unsplash `photo-1621905252507-b35492cc74b4?w=800&q=80`) a la derecha
    - Imagen oculta en mobile
    - Animación stagger slide-in desde la izquierda al entrar en viewport
    - Todas las cadenas traducidas vía i18n
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 9. Carrusel de Marcas
  - [x] 9.1 Implementar `BrandsCarousel`
    - 12 marcas: Samsung, LG, Whirlpool, GE, Maytag, Frigidaire, Bosch, KitchenAid, Electrolux, Amana, Speed Queen, Haier
    - Logos SVG inline para Samsung, LG, GE, Bosch; texto estilizado Poppins Bold para el resto
    - Todos en escala de grises (`filter: grayscale(100%)`), color en hover
    - Lista duplicada en DOM para scroll infinito seamless con CSS `@keyframes`
    - `onMouseEnter` pausa la animación vía `animation-play-state: paused`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 10. Catálogo de Productos
  - [x] 10.1 Implementar `ProductCard`
    - Imagen desde Firebase Storage URL (o placeholder Unsplash por categoría), nombre, descripción corta, precio en USD, botón WhatsApp CTA
    - `loading="lazy"` en imagen, `alt` descriptivo
    - Animación stagger fade-in al entrar en viewport
    - _Requirements: 7.2, 7.3, 14.2, 14.3_
  - [x] 10.2 Implementar `CategoryFilter` y `SearchInput`
    - `CategoryFilter`: botones de categoría que filtran el grid en tiempo real sin recarga
    - `SearchInput`: filtra por nombre y descripción en el locale activo, case-insensitive
    - Empty state con mensaje amigable cuando no hay resultados
    - _Requirements: 7.5, 7.6, 7.7_
  - [ ]* 10.3 Escribir property test — Property 4: Product filter invariant
    - **Property 4: Product filter invariant**
    - **Validates: Requirements 7.5**
    - Usar `fc.array(fc.record({ category: fc.constantFrom(...categories) }))` + `fc.constantFrom(categories, 'all')`; verificar que todos los resultados tengan la categoría correcta o que se devuelvan todos cuando `C === 'all'`
  - [ ]* 10.4 Escribir property test — Property 5: Product search invariant
    - **Property 5: Product search invariant**
    - **Validates: Requirements 7.6**
    - Usar `fc.array(fc.record({ name: fc.record({es,en,fr}), description: fc.record({es,en,fr}) }))` + `fc.string({minLength:1})`; verificar que todos los resultados contengan el query como substring case-insensitive
  - [x] 10.5 Implementar `ProductGrid` con paginación/infinite scroll
    - Cargar productos en batches de 12 desde Firestore
    - Estado de error con mensaje descriptivo y botón "Reintentar"
    - _Requirements: 7.4, 7.8, 7.9_
  - [x] 10.6 Implementar preview de productos en Home
    - Mostrar los 6 productos más recientes usando `useProducts()`
    - _Requirements: 7.1_

- [x] 11. Checkpoint — Verificar secciones públicas
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Sección de Ubicación y Contacto
  - [x] 12.1 Implementar `MapEmbed` y `LocationSection`
    - `<iframe>` con `src` leído desde `settings.mapEmbedUrl` (variable de entorno como fallback)
    - Mostrar dirección, horarios (desde `useSettings()`) y teléfono
    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 12.2 Implementar `ContactForm`
    - Campos: name, email, phone, message
    - Validación client-side antes de envío: campos requeridos, formato email
    - Mensajes de error inline por campo
    - Envío vía `emailjs-com` o Netlify Function; mostrar confirmación de éxito
    - _Requirements: 8.4, 8.5, 8.6_
  - [ ]* 12.3 Escribir unit tests para `ContactForm`
    - Verificar que el formulario no se envía con campos vacíos
    - Verificar mensajes de error inline
    - _Requirements: 8.6_
  - [ ]* 12.4 Escribir property test — Property 6: Empty task validation (contact form)
    - **Property 6: Empty task validation (contact form)**
    - **Validates: Requirements 8.6**
    - Usar `fc.record({ name: fc.oneof(fc.constant(''), fc.string()), email: fc.oneof(fc.constant(''), fc.string()), phone: fc.string(), message: fc.oneof(fc.constant(''), fc.string()) })` con al menos un campo vacío; verificar que no se llame al servicio de envío y que haya al menos un error visible
  - [x] 12.3 Implementar página `/contacto`
    - Reutiliza `ContactForm` + `MapEmbed` + datos de contacto
    - _Requirements: 8.7_

- [x] 13. Panel de Administración — Autenticación
  - [x] 13.1 Implementar `LoginForm` y página `/admin`
    - Campos email y password, botón submit
    - Llamada a `authService.signIn()`; redirect a `/admin/dashboard` en éxito
    - Mostrar error descriptivo bajo el formulario en caso de credenciales inválidas
    - Si ya hay sesión activa al cargar `/admin`, redirigir a `/admin/dashboard`
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  - [ ]* 13.2 Escribir unit tests para `LoginForm`
    - Verificar redirect en login exitoso
    - Verificar mensaje de error en credenciales inválidas
    - _Requirements: 11.2, 11.3_

- [x] 14. Panel de Administración — Gestión de Productos
  - [x] 14.1 Implementar `Dashboard` con listado de productos
    - Tabla/lista de todos los productos con botones Editar y Eliminar
    - Botón "Ver sitio" que abre `/` en nueva pestaña
    - Botón logout que llama a `authService.signOut()` y redirige a `/admin`
    - _Requirements: 12.1, 11.5, 13.3_
  - [x] 14.2 Implementar `ProductForm` (crear y editar)
    - Campos: name (ES/EN/FR), description (ES/EN/FR), price, category, image upload
    - Upload de imagen a Firebase Storage; almacenar URL en documento Firestore
    - Modo creación (sin `product` prop) y modo edición (pre-poblado)
    - Timestamp `createdAt` generado por servidor en creación
    - Mensajes de error descriptivos si falla Firestore o Storage
    - _Requirements: 12.2, 12.3, 12.4, 12.5, 12.6, 12.8_
  - [x] 14.3 Implementar eliminación de productos
    - Eliminar documento Firestore y archivo en Firebase Storage
    - Confirmación antes de eliminar; mensaje de error si falla
    - _Requirements: 12.7, 12.8_

- [x] 15. Panel de Administración — Edición de Configuración del Sitio
  - [x] 15.1 Implementar `SettingsForm`
    - Campos editables: número WhatsApp, título Hero (ES/EN/FR), subtítulo Hero (ES/EN/FR), valores de contadores, URL del mapa, horarios de negocio, links de redes sociales
    - Al guardar, actualiza el documento `settings/site` en Firestore
    - _Requirements: 13.1, 13.2_

- [x] 16. Checkpoint — Verificar panel de administración
  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. Accesibilidad, rendimiento y ajustes finales
  - [x] 17.1 Auditar y corregir accesibilidad
    - Verificar `alt` en todas las imágenes
    - Verificar `focus` visible en todos los elementos interactivos
    - Verificar contraste de color ≥ 4.5:1 en texto principal
    - _Requirements: 14.3, 14.4, 14.5_
  - [x] 17.2 Verificar lazy loading de imágenes
    - Confirmar `loading="lazy"` en todas las imágenes de productos y servicios
    - _Requirements: 14.2_
  - [x] 17.3 Verificar responsive design
    - Probar layouts en 320px, 768px, 1280px, 1920px
    - _Requirements: 14.6_
  - [x] 17.4 Verificar build de producción
    - Ejecutar `npm run build` y confirmar que no hay errores
    - Verificar que `npm run dev` no produce errores en consola
    - _Requirements: 14.7, 14.8_

- [x] 18. Checkpoint final — Verificar suite completa de tests
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia los requisitos específicos para trazabilidad
- Las imágenes de Unsplash se usan directamente por URL — no se descargan al repo
- Los logos de marcas se renderizan como SVG inline (Samsung, LG, GE, Bosch) o texto estilizado Poppins Bold (resto)
- La imagen de técnico en "¿Por Qué Elegirnos?" viene de Unsplash `photo-1621905252507-b35492cc74b4`
- Los property tests usan `fast-check` con mínimo 100 iteraciones por propiedad
- Cada property test incluye el tag: `// Feature: fg-reparacion-ventas-website, Property N: <texto>`
