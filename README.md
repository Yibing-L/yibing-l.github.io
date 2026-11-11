# Yibing Lu · Research portfolio

A buildless, responsive research portfolio for **https://yibing-l.github.io/**.

## Preview

From this folder, run `python -m http.server 8000`, then visit http://localhost:8000.
No packages, framework, or build step are required. You can also double-click `index.html` to open it in Chrome or Edge; the navigation uses explicit HTML files so the pages work directly from your computer.

## Publish to GitHub Pages

1. Create a **public** repository on GitHub named **yibing-l.github.io**, owned by **Yibing-L**. Do not add a template or README during creation.
2. Push this folder as the repository root on branch `main`. Upload only this folder’s contents, not the surrounding workspace.
3. Open the repository’s **Settings → Pages**, and select **GitHub Actions** as the source.
4. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow** if the initial push ran before Pages was enabled.
5. Wait for the workflow to succeed, then visit https://yibing-l.github.io/.

Alternatively, omit the workflow and select **Deploy from a branch → main → / (root)**. The `.nojekyll` file keeps the site buildless.

GitHub’s official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Edit content

- Home and biography: `index.html`.
- Case studies: `projects/homeplus/index.html`, `projects/wayfind/index.html`, `projects/long-term-design/index.html`.
- Research outputs and citation text: `publications/index.html`; downloadable references: `assets/research-outputs.bib`.
- CV: replace `assets/Yibing_Lu_CV.pdf` while keeping the filename.
- Photos and video: `assets/homeplus/`; gallery: `gallery/index.html`; demonstration: `demos/index.html`. Original supplied media remain unchanged outside this site.
- Appearance: `assets/style.css`; navigation, filtering, citation copy, photo dialog: `assets/main.js`.
- Interactive conceptual demos: `assets/demos.js`.

Publication labels distinguish under-review work, a poster and extended abstract, and an unpublished manuscript. The recorded video shows an individual prototype demonstration. The architecture explainer uses illustrative content. Neither presents a benchmark or user-study result.

The CV was exported from the revised November 11, 2026 Word CV. Review its contact details before public publication.

## Image credit

Home+ photographs and the cup-pickup demonstration were supplied by Yibing Lu. Photographs illustrate prototype setups and intended interactions, rather than user-study sessions. The demonstration is a single recorded prototype run.

The retrospective figures are reproduced from the submitted manuscript, with original annotations/source markers retained. The author-supplied swimlane is also available. WayFind floor plans and landmark images come from the supplied project archive; no raw participant data are included. Paper-style layouts use `assets/paper.css`.
