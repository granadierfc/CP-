# CP Knowledge Hub

A GitHub-friendly static web app for organizing competitive programming work in one place:

- implementations and verification status
- notes in markdown / LaTeX / PDF-backed form
- a compact journal of problems worth remembering
- a calm, sidebar-first interface instead of a crowded dashboard

## Why this shape

The project is inspired by verification-first competitive programming libraries such as [maspypy/library](https://github.com/maspypy/library), but aims to be much easier to browse and extend as a personal dashboard.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The app is configured with `base: "./"` in [vite.config.ts](/Users/pushpraj/Desktop/CP/vite.config.ts), which keeps the generated site friendly to GitHub Pages-style static hosting.

## Content structure

- Implementation metadata lives in [library.ts](/Users/pushpraj/Desktop/CP/src/content/library.ts)
- Problem metadata lives in [problems.ts](/Users/pushpraj/Desktop/CP/src/content/problems.ts)
- Notes live in [src/content/notes](/Users/pushpraj/Desktop/CP/src/content/notes)
- External references live in [references.ts](/Users/pushpraj/Desktop/CP/src/content/references.ts)
- Shared content types live in [types.ts](/Users/pushpraj/Desktop/CP/src/content/types.ts)

The repository starts intentionally sparse. The UI is built to look good with real content and to stay restrained when the lists are still empty.

## Where to customize

- Aggregated selectors and app-facing content helpers live in [content.ts](/Users/pushpraj/Desktop/CP/src/data/content.ts)
- Main UI lives in [App.tsx](/Users/pushpraj/Desktop/CP/src/App.tsx)
- Styling lives in [styles.css](/Users/pushpraj/Desktop/CP/src/styles.css)
- GitHub Pages deployment is prepared in [deploy.yml](/Users/pushpraj/Desktop/CP/.github/workflows/deploy.yml)

## Suggested repo workflow

1. Keep implementations in your actual library folders and mirror metadata in `src/content/library.ts`.
2. Store short notes as markdown or index them through `src/content/notes/`.
3. Put longer PDFs in `public/references/` and link them from the content model.
4. Push the repo and let GitHub Pages deploy via Actions.
5. Later, automate verification status ingestion from `verification-helper`.

## Deploy on GitHub

The deployment workflow is already implemented. Once your GitHub repo exists, the exact steps are:

```bash
git add .
git commit -m "Initial CP knowledge hub"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Then on GitHub:

1. Open the repository.
2. Go to `Settings` -> `Pages`.
3. Under build/deployment, choose `GitHub Actions`.
4. The workflow in `.github/workflows/deploy.yml` will publish the site on every push to `main`.

If you later want a custom domain, add it in GitHub Pages settings and commit a `public/CNAME` file.

## Next upgrades you can add

1. Connect verification output from `online-judge-tools/verification-helper` into JSON so statuses update automatically.
2. Add search, tag filtering, and per-implementation detail pages.
3. Add import tooling that generates metadata from your real CP repository structure.
4. Add per-implementation detail pages with proof sketches and failure history.
