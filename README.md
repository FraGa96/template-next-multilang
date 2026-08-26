# Next.js Multilanguage Template

A modern, production-ready template for building multilingual Next.js applications with TypeScript, Tailwind CSS, and internationalization support.

## 🚀 Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Internationalization** with next-intl (English & Spanish)
- **Theming** (light/dark cookie-based switching, mirrors the locale pattern)
- **Forms & validation** with `react-hook-form` + `zod`, errors localized via next-intl
- **CSP security middleware** (nonce-based `Content-Security-Policy-Report-Only`)
- **PWA support** (optional, opt-in) — installable, offline fallback via `serwist`
- **ESLint** with custom rules for code quality
- **Vitest + Testing Library** for unit/component tests
- **GitHub Actions** CI/CD pipeline
- **Responsive Design** ready for mobile and desktop
- **Docker support** (optional, opt-in)

## 🛠 Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Internationalization:** next-intl
- **Testing:** Vitest + Testing Library
- **Linting:** ESLint with React & TypeScript plugins
- **Package Manager:** Yarn

## 📁 Project Structure

```
template-next-multilang/
├── app/
│   ├── api/
│   │   ├── locale/
│   │   │   └── route.ts          # API route for locale switching
│   │   └── theme/
│   │       └── route.ts          # API route for theme switching
│   ├── components/
│   │   ├── __tests__/            # Co-located component tests
│   │   └── LanguageSwitcher.tsx
│   ├── lib/
│   │   ├── hooks/
│   │   │   └── useResponsive.tsx # isMobile/isTablet breakpoint hook
│   │   └── utils/
│   │       ├── api-client.ts     # Generic fetch wrapper (SSR + browser)
│   │       ├── service-worker.ts # clearServiceWorkerCaches() helper (PWA)
│   │       └── zod-i18n.ts       # Zod error map + react-hook-form resolver, localized
│   ├── ~offline/
│   │   └── page.tsx              # Offline fallback page (PWA)
│   ├── layout.tsx                # Root layout with i18n + theme provider
│   ├── manifest.ts               # PWA web app manifest
│   ├── page.tsx                  # Home page
│   ├── robots.ts                 # Generated robots.txt
│   ├── sitemap.ts                # Auto-discovered sitemap.xml
│   └── sw.ts                     # Service worker source (compiled to public/sw.js)
├── i18n/
│   └── request.ts                # Server-side i18n configuration
├── locales/
│   ├── en/
│   │   └── common.json
│   ├── es/
│   │   └── common.json
│   ├── en.ts
│   └── es.ts
├── middlewares/
│   ├── csp.middleware.ts         # Nonce-based CSP-Report-Only header
│   ├── i18next.middleware.ts     # i18n middleware
│   └── middlewares.utils.ts      # Middleware utilities
├── utils/
│   ├── cookies.utils.ts          # Generic server cookie read helpers
│   ├── locales.utils.ts          # Locale constants and types
│   ├── theme-resolver.utils.ts   # getResolvedTheme() server helper
│   └── themes.utils.ts           # Theme constants and types
├── __mocks__/
│   └── svg.tsx                   # Manual SVG mock for Vitest
├── .github/
│   └── workflows/
│       ├── ci.yml                # Lint, test & build on PRs
│       └── setup-template.yml    # One-time rename on first push (self-destructs)
├── .env.example                  # Required environment variables
├── Dockerfile                    # Optional multi-stage production build
├── .dockerignore
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── proxy.ts                      # Middleware entry point (project root, not app/)
├── vitest.config.ts              # Vitest configuration
├── vitest.setup.ts               # Test environment setup (jest-dom, matchMedia)
└── tsconfig.json                 # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20.x)
- Yarn package manager

### Installation

1. **Use as GitHub Template**
   - Click "Use this template" on GitHub
   - Create your new repository

2. **Clone and Install**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_SITE_URL` (see [Environment Variables](#-environment-variables)).

4. **Start Development Server**
   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
yarn build
yarn start
```

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Backend API base URL, no trailing slash. Used by `app/lib/utils/api-client.ts` for browser requests. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical base URL of this app, no trailing slash. Used by `app/robots.ts` and `app/sitemap.ts`. |
| `API_INTERNAL_URL` | No | Server-side/SSR base URL (e.g. a Docker-internal service name), used instead of `NEXT_PUBLIC_API_BASE_URL` during SSR when set. |

## 🌐 Internationalization

This template includes support for English and Spanish locales:

- **Default Locale:** English (`en`)
- **Supported Locales:** `en`, `es`
- **Cookie-based:** Locale preference stored in `NEXT_LOCALE` cookie

### Adding New Languages

1. Create translation files in `locales/` (e.g., `fr.ts`)
2. Update `utils/locales.utils.ts` with new locale
3. Update `next-intl.config.ts` if needed

### Translation Files

Translations are stored in JSON files within `locales/[locale]/common.json`.

## 🌓 Theming

Light/dark theme switching mirrors the locale pattern: preference is stored in the `NEXT_THEME`
cookie, `utils/theme-resolver.utils.ts`'s `getResolvedTheme()` resolves it server-side in
`app/layout.tsx` (setting `data-theme` on `<html>`), and `app/api/theme/route.ts` updates the
cookie. There's no visual switcher component yet — add one following
`app/components/LanguageSwitcher.tsx`'s pattern when you need it.

## 📝 Forms & validation

`react-hook-form` + `zod` are wired up with localized error messages via
`app/lib/utils/zod-i18n.ts`. Call `useZodI18n(namespace, schema)` in a client component to get a
resolver that reads `t('validation.<code>')` from the given translation namespace — see the
`validation` object in `locales/en/common.json` / `locales/es/common.json` for the generic base
keys. Put schemas in `app/lib/schemas/` as you add forms.

## 🐳 Docker support (optional)

This template ships with a production-ready, multi-stage `Dockerfile` (Node 22 alpine, non-root user, Next.js standalone output) and a matching `.dockerignore`. It's opt-in — if your project doesn't need containerization, delete it:

1. Remove `Dockerfile` and `.dockerignore`
2. Remove the `output: 'standalone'` line from `next.config.ts`

To use it as-is:

```bash
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.example.com -t my-app .
docker run -p 3000:3000 my-app
```

## 📲 PWA support (optional)

This template ships with `serwist`/`@serwist/next` wired up for an installable, offline-capable
app. It's opt-in — if your project doesn't need it, remove it:

1. Delete `app/sw.ts`, `app/manifest.ts`, `app/~offline/`, and `app/lib/utils/service-worker.ts`
2. Revert the `withSerwistInit` wrapper in `next.config.ts`
3. Revert the `types`/`lib`/`exclude` additions in `tsconfig.json`
4. Remove the `serwist` and `@serwist/next` dependencies

To use it as-is: replace the placeholder `name`/`short_name`/`description` in `app/manifest.ts`
and drop real `icon-192.png` / `icon-512.png` files into `public/`. The service worker only builds
in production (`yarn build`/`yarn start`) — it's disabled in `yarn dev`.

## 🧪 Testing

Uses Vitest + `@testing-library/react` with a jsdom environment (config in `vitest.config.ts`).

- **Test location**: co-located `__tests__/` folders next to the source they cover (e.g. `app/components/__tests__/LanguageSwitcher.test.tsx`).
- **Globals**: `vi`, `describe`, `it`, `expect`, `beforeEach`, `afterEach` are available without imports (`globals: true`). Types come from `vitest.d.ts`.
- **SVG imports** are automatically stubbed by a Vite plugin in `vitest.config.ts` — no per-test mock needed.

Standard module mocks to reach for:

```typescript
// next-intl — returns the key as the translation string
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

// next/link — renders a plain <a>
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))
```

## 🎨 Customization

### Styling

- Modify `app/globals.css` for global styles (Tailwind v4 `@theme` block)
- Component styles use Tailwind classes

### ESLint Rules

Custom rules are configured in `eslint.config.mjs`:
- Line length limit (85 chars) for JSX/TSX files
- No unused variables (with exceptions for `_` prefixed)
- Custom quotes and formatting rules
- Relaxed rules (Vitest globals, `max-len`, `no-explicit-any`) for test files

### Language Switcher

The language selector is in `app/components/LanguageSwitcher.tsx`. It:
- Reads current locale from cookies
- Updates locale via API call
- Refreshes the page to apply changes

## 📋 Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production (webpack)
- `yarn build:turbo` - Build for production (Turbopack, opt-in)
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run tests in watch mode
- `yarn test:run` - Run tests once (CI mode)
- `yarn test:coverage` - Run tests with coverage report

## 🤝 Contributing

Since this is a template repository:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
