# F&G Reparación y Ventas — Website

Sitio web profesional para F&G Reparación y Ventas. SPA construida con React + TypeScript + Vite, desplegada en Netlify con backend en Firebase.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS v3
- Framer Motion v11
- i18next (ES/EN/FR)
- Firebase (Firestore, Auth, Storage)
- Netlify

## Setup

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd fg-reparacion-ventas-website
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con los valores reales de tu proyecto Firebase.

### 4. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/) y crea un nuevo proyecto.
2. Habilita **Firestore Database** en modo producción.
3. Habilita **Authentication** con el proveedor Email/Password.
4. Habilita **Storage**.
5. En Configuración del proyecto → Tus apps → Web, registra la app y copia las credenciales al `.env`.
6. Crea el primer usuario admin desde Firebase Console → Authentication → Users.

#### Reglas de Firestore (desarrollo)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /settings/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### Reglas de Storage (desarrollo)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Servidor de desarrollo

```bash
npm run dev
```

### 6. Tests

```bash
npm test
```

## Despliegue en Netlify

1. Conecta el repositorio en [Netlify](https://app.netlify.com/).
2. El archivo `netlify.toml` ya configura el build command y el directorio de publicación.
3. En Netlify → Site settings → Environment variables, agrega todas las variables de `.env.example` con sus valores reales.
4. Haz push a `main` para disparar el deploy automático.

## Estructura del proyecto

```
src/
├── assets/
├── components/
│   ├── common/       # Button, Card, Spinner, ErrorBoundary
│   ├── layout/       # Navbar, Footer, PageTransition
│   ├── home/         # Hero, ServicesPreview, WhyUs, BrandsCarousel
│   ├── products/     # ProductCard, ProductGrid, CategoryFilter
│   ├── services/     # ServiceCard, ServicesGrid
│   ├── contact/      # ContactForm, MapEmbed
│   └── admin/        # LoginForm, Dashboard, ProductForm, SettingsForm
├── hooks/
├── lib/              # firebase.ts, i18n.ts
├── locales/          # es.json, en.json, fr.json
├── pages/
├── router/
├── services/         # firestoreService, storageService, authService
├── test/             # setup.ts
├── types/
└── main.tsx
```
