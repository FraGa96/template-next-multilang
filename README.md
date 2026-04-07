# Next.js Multilanguage Template

A modern, production-ready template for building multilingual Next.js applications with TypeScript, Tailwind CSS, and internationalization support.

## 🚀 Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Internationalization** with next-intl (English & Spanish)
- **ESLint** with custom rules for code quality
- **GitHub Actions** CI/CD pipeline
- **Responsive Design** ready for mobile and desktop

## 🛠 Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Internationalization:** next-intl
- **Linting:** ESLint with React & TypeScript plugins
- **Package Manager:** Yarn

## 📁 Project Structure

```
template-next-multilang/
├── app/
│   ├── api/
│   │   └── locale/
│   │       └── route.ts          # API route for locale switching
│   ├── components/
│   ├── layout.tsx                # Root layout with i18n provider
│   ├── page.tsx                  # Home page
│   └── proxy.ts                  # Middleware configuration
├── i18n/
│   └── request.ts                # Server-side i18n configuration
├── locales/
│   ├── en
|   |   ├── namespace.json        
│   └── en.ts                     
├── middlewares/
│   ├── i18next.middleware.ts     # i18n middleware
│   └── middlewares.utils.ts      # Middleware utilities
├── utils/
│   └── locales.utils.ts          # Locale constants and types
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
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

3. **Start Development Server**
   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
yarn build
yarn start
```

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

## 🎨 Customization

### Styling

- Modify `app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.ts`
- Component styles use Tailwind classes

### ESLint Rules

Custom rules are configured in `eslint.config.mjs`:
- Line length limit (85 chars) for JSX/TSX files
- No unused variables (with exceptions for `_` prefixed)
- Custom quotes and formatting rules

### Language Switcher

The language selector is in `app/components/LanguageSwitcher.tsx`. It:
- Reads current locale from cookies
- Updates locale via API call
- Refreshes the page to apply changes

## 📋 Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

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
