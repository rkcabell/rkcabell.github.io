Mental buckets
- Content sources: `pages/*.md`, `wiki/*.md` (indexes + world pages), collections in `_chapters`, `_eras`, `_environments`, `_habitals`, `_projects`, `_posts`, data in `_data/*` (galleries, nav, maps, wiki yaml/json), and scripts in `scripts/*` that generate data.
- Render layers: layouts in `_layouts/*`, includes in `_includes/*`, CSS in `assets/css/*`, JS in `assets/js/*` and `projects/js/*`.
- Routing/IA: explicit permalinks in `pages/*.md`, `wiki/*.md`, `_projects/*.md`, collection routes in `_config.yml`, top nav from `_data/nav_personal.yml` via `_includes/nav.html`, wiki sidebar from `_includes/wiki-sidebar.html`, project sidebar from `_includes/project-sidebar.html`.
- Index/list pages: `wiki/chapters.md`, `wiki/eras.md`, `wiki/environments.md`, `wiki/habitals.md`, `pages/personal_projects.md` (no `site.pages` loops found).
- Deployment constraints: `_plugins/*` exist but are not enabled in `_config.yml`, and GitHub Pages defaults restrict custom plugins.

Top 10 redundancies
- Gallery page stubs repeat front matter and use the same layout; only titles/slug/gallery keys change. Files: `pages/cat.md`, `pages/art.md`, `pages/karuta.md`. Risk: inconsistent metadata; Replace with: single gallery registry + one gallery layout/include.
- Wiki index pages share identical list markup across sections. Files: `wiki/chapters.md`, `wiki/eras.md`, `wiki/environments.md`, `wiki/habitals.md`. Risk: duplicated fixes; Replace with: shared include or index layout driven by section config.
- Project sorting/filtering logic is duplicated. Files: `pages/personal_projects.md`, `_includes/project-sidebar.html`. Risk: ordering drift; Replace with: shared include or assign once in an include.
- Wiki content exists in multiple formats. Files: `_chapters/*`, `_data/chapters.yaml`, `_data/wiki-json/chapters.json` (plus `_data/eras.yaml`, `_data/locations.yaml`, `_data/events.yaml`, `_data/myths.yaml`). Risk: divergence; Replace with: one canonical source (collections or data) and archive the rest.
- Multiple nav systems and schemas. Files: `_data/nav_personal.yml`, `_data/navigation.yml`, `_layouts/basewiki_layout.html`. Risk: inconsistent nav; Replace with: one nav renderer + one data source.
- Head/meta + header markup repeated across layouts. Files: `_layouts/default.html`, `_layouts/gallery_layout.html`, `_layouts/project_layout.html`, `_layouts/personalproject_layout.html`, `_layouts/basewiki_layout.html`, `_layouts/404.html`, `_layouts/personal_homepage.html`, `_layouts/eras_layout.html`. Risk: inconsistent updates; Replace with: shared head/header includes.
- CSS is loaded twice. Files: `_includes/nav.html`, `_layouts/default.html` (and other layouts). Risk: duplicate requests; Replace with: load CSS once in layouts only.
- p5.js is duplicated (CDN + local full + local min). Files: `_layouts/project_layout.html`, `projects/js/p5.js`, `projects/js/p5.min.js`. Risk: double load and drift; Replace with: single source (prefer one local or CDN).
- Unused/legacy templates/assets remain in-tree. Files: `_layouts/eras_layout.html`, `_includes/post-head.html`, `assets/js/clairvoyance.js`, `assets/js/cursor-glow copy.js`, `assets/js/watermark.js`. Risk: noise and confusion; Replace with: remove or archive.
- Gallery data mirrors thumbnail filenames and dates. Files: `_data/*-gallery.yml`, `assets/images/thumbnails/*`. Risk: manual regen + drift; Replace with: generate data from gallery registry + filesystem in one script.

Top 10 blockers
- Gallery tooling is brittle and path-locked. Files: `scripts/populate_galleries.py`, `scripts/rename_files.py`, `scripts/thumbify.bat`, `scripts/new_gallery.py`. Block: adding images requires local absolute paths, ImageMagick, and multiple scripts.
- Gallery generation is opt-in per mode. File: `scripts/populate_galleries.py`. Block: `modes = ["cat"]` and filename filters require manual edits per gallery.
- Thumbnail pipeline wipes all thumbs each run. File: `scripts/thumbify.bat`. Block: adding one gallery risks regenerating all thumbnails and overwriting manual work.
- Gallery image filter mismatch + plugin constraints. Files: `_layouts/gallery_layout.html`, `_plugins/image_src_validate.rb`, `_config.yml`. Block: `image_src_validate` filter is undefined on GitHub Pages (custom plugins not enabled).
- Car gallery is outside the gallery system. Files: `pages/Car.md`, `_data/Car-gallery.yml`. Block: `layout: default` and empty data mean new car images are invisible to gallery layout.
- Wiki source of truth is split between collections and data. Files: `_chapters/*`, `_data/chapters.yaml`, `_data/wiki-json/chapters.json`, `scripts/process_wiki.py`, `scripts/populate_wiki.py`. Block: additions can land in the wrong store.
- Environments index points to the wrong collection. Files: `wiki/environments.md`, `_config.yml`, `_locations`. Block: `site.locations` is empty unless a collection is configured.
- Wiki front matter is inconsistent. Files: `_chapters/Amplituhedron.md`, `_chapters/*`, `_config.yml`. Block: missing layout/title/order causes inconsistent rendering.
- Wiki navigation is URL-coupled. File: `_layouts/wikipage_layout.html`. Block: section links/back buttons depend on hardcoded URL checks.
- CI/deploy guardrails are missing or miswired. Files: `.github/workflows/ci.yaml`, `_plugins/*`. Block: no link/metadata checks and CI references missing `script/*` entries.

Gallery pipeline: current vs target
- Current: add originals to `assets/images/*_img/` (ignored by git); run `scripts/rename_files.py` (randomize + prefix); run `scripts/thumbify.bat` (ImageMagick, wipes `assets/images/thumbnails/*`); update `scripts/populate_galleries.py` modes or run `scripts/new_gallery.py`; run `scripts/populate_galleries.py` to generate `_data/*-gallery.yml`; commit thumbnails + data.
- Target: drop originals into `assets/images/galleries/<id>/originals/`; run one command (e.g. `python scripts/gallery_pipeline.py --gallery <id>`) to create `assets/images/galleries/<id>/thumbs/` and update a single gallery data schema (e.g. `_data/galleries/<id>.yml` or `_data/galleries.yml`); commit originals (optional), thumbs, and data; no template edits.

Wiki pipeline: current vs target
- Current: add/edit collection entries in `_chapters`, `_eras`, `_environments`, `_habitals` (front matter varies); index pages in `wiki/*.md` manually list collections; optional legacy scripts generate `_data/*.yaml` + `_data/wiki-json/*.json` and may overwrite content.
- Target: choose one canonical source (recommend collections); add a new entry file with required front matter; index pages and sidebar are generated by one include/layout from the canonical source; ordering is deterministic via `order`, URLs via collection permalinks; no manual nav edits.

Backlog
- Gallery system: create a single gallery registry + grid include; touch `pages/cat.md`, `pages/art.md`, `pages/karuta.md`, `pages/Car.md`, `_layouts/gallery_layout.html`, new `_includes/gallery_grid.html`, new `_data/galleries.yml`; removes duplicated gallery stubs and markup; new source of truth is `site.data.galleries`; verify by adding one image and confirming `cat.html` renders via `bundle exec jekyll build`.
- Gallery system: replace multi-script pipeline with one command; touch `scripts/new_gallery.py`, `scripts/populate_galleries.py`, `scripts/rename_files.py`, `scripts/thumbify.bat`, new `scripts/gallery_pipeline.py`; removes hardcoded paths and manual edits; new source of truth is the gallery registry + generated data; verify by running the script and checking thumbnails + `_data` update without template changes.
- Wiki system: standardize collection defaults; touch `_config.yml`, `_chapters/*`, `_eras/*`, `_environments/*`, `_habitals/*`; removes inconsistent front matter; new source of truth is collections with defaults; verify by adding a new entry file and confirming it renders with `wikipage_layout`.
- Wiki system: DRY index pages + fix environments loop; touch `wiki/chapters.md`, `wiki/eras.md`, `wiki/environments.md`, `wiki/habitals.md`, new `_includes/wiki_index.html` (or layout), optional `_data/wiki_sections.yml`; removes duplicated list markup and `site.locations` bug; new source of truth is collection loops; verify all index pages render lists correctly.
- Navigation/IA: consolidate top nav; touch `_layouts/basewiki_layout.html`, `_includes/nav.html`, `_data/nav_personal.yml`, `_data/navigation.yml`; removes manual nav duplication; new source of truth is a single nav data file; verify nav is consistent on personal + wiki pages.
- Navigation/IA: decouple wiki back-links from URL string checks; touch `_layouts/wikipage_layout.html`, add `_data/wiki_sections.yml` or per-collection defaults; removes hidden coupling; new source of truth is section metadata; verify back-links still work after a permalink change.
- Deploy/guardrails: resolve custom filter + Pages constraints; touch `_layouts/gallery_layout.html`, `_plugins/image_src_validate.rb`, `_config.yml` (and `.github/workflows/*` if moving to Actions build); removes broken filter and deploy risk; new source of truth is either built-in filters or an Actions build; verify `bundle exec jekyll build` passes and images render.
- Guardrails: add metadata + link checks; touch new `tools/validate_content.py` and `.github/workflows/ci.yaml`; removes silent metadata/link drift; new source of truth is automated validation; verify the check fails on missing gallery/wiki metadata and passes on clean builds (include a "add one image" and "add one wiki entry" test).
