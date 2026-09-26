# sepic.me

Personal site of Nikola Šepić: web developer and digital marketing specialist from Belgrade.
Serbian is the default language at `/`, English lives under `/en`.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, next-intl. The 3D room on the home page is modelled in Blender and rendered with React Three Fiber. Hosted on Vercel.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint, typecheck, unit tests, formatting
npm run e2e        # Playwright smoke tests with axe accessibility checks
npm run build
```

## Structure

```
app/[locale]/      routes (sr default, en prefixed)
components/        shared UI
content/           site data and case studies (single source for the site and the CV)
i18n/, messages/   routing and translations
lib/               config and helpers
blender/           scripts that build, bake and export the room scene
scripts/           CV generator, screenshot tooling
e2e/               Playwright tests
```

The previous Windows 95 themed version of the site is kept on the `legacy-win95` branch.
