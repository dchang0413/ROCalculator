# RO Calculator

RO Calculator is a modern, modular Ragnarok Online build calculator for iRO. This version is a full application rewrite using Vue 3, Vite, TypeScript, Tailwind CSS v4, and Vitest while preserving the legacy data sets for presets, equipment, job bonuses, and images.

## What changed

- **Modern application stack**: Vue 3 Composition API, Vite, TypeScript, and Tailwind CSS v4.
- **Modular UI blocks**: every major page area is a module that can be enabled, disabled, expanded, or collapsed from the settings panel.
- **Preset preservation**: existing template JSON files are imported into the new app and can be loaded through the Presets module.
- **Local and URL persistence**: module layout is stored in local browser storage, builds can be saved locally, exported as JSON, imported from JSON, or written into the URL as a share payload.
- **GitHub Pages ready**: production output is generated in `dist/` and the Vite base path switches to `/ROCalculator/` when `GITHUB_PAGES=true` is set.
- **In-app help**: FAQ / How-to-use content now lives inside the application instead of only in the README.

## Feature map

The rewrite keeps the existing calculator areas available as collapsible modules:

1. **Presets** - search and load published builds from `template/metadata.json` and the template JSON files.
2. **Character Status** - edit build name, levels, base stats, trait stats, attributes, and view job bonus data.
3. **Target / Enemy** - adjust enemy name, race, size, element, level, DEF, MDEF, RES, MRES, and green aura.
4. **Consumables & Buffs** - inspect imported consumables and support skill data.
5. **Skill** - edit selected skill, skill percent, equipment skill modifier, and mastery attack.
6. **Equipment** - inspect equipment, cards, enchants, refine levels, effects, combos, and summarized numeric effects.
7. **Damage Calculation** - compare preserved preset reference numbers against the transparent modern estimator.
8. **Casting & Delay** - review estimated cast time, after-cast / GCD delay, and attack delay.
9. **Save / Load** - save builds locally, download JSON, import JSON, and update the URL with a shareable build payload.
10. **FAQ / How to use** - quick workflow help inside the app.

> Note: legacy preset reference damage and DPS are preserved from the JSON files. The new estimator is intentionally transparent and test-covered so formulas can be evolved safely as the project continues.

## Requirements

- Node.js 22 or newer is recommended.
- npm is used by the checked-in lockfile.

## Development

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

Run type checking:

```bash
npm run typecheck
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages deployment

For this repository path, build with the GitHub Pages base path enabled:

```bash
GITHUB_PAGES=true npm run build
```

Publish the generated `dist/` folder with your preferred GitHub Pages workflow. A typical workflow is:

1. Check out the repository.
2. Set up Node.js.
3. Run `npm ci`.
4. Run `GITHUB_PAGES=true npm run build`.
5. Upload and deploy `dist/` as the Pages artifact.

If the project later moves to a custom domain or a different repository name, update `vite.config.ts` accordingly.

## Data layout

- `template/` contains saved build presets and `metadata.json`.
- `default_equip/` contains class and shared equipment records.
- `job_bonus/` and `job_bonus_3rd/` contain job bonus tables.
- `public/img/` contains the images used by documentation and the application.
- `src/domain/` contains framework-independent business logic.
- `src/components/modules/` contains plug-in-like UI modules.
- `tests/` contains Vitest unit tests for the calculation, sharing, and module registry logic.

## Contributing notes

- Prefer adding new page areas as module definitions in `src/domain/modules.ts` and Vue components under `src/components/modules/`.
- Keep domain logic in `src/domain/` when possible so it can be unit tested without rendering Vue components.
- Run `npm test`, `npm run lint`, and `npm run build` before opening a pull request.
- Keep comments and user-facing text in English.

## License

GPL-3.0-or-later.
