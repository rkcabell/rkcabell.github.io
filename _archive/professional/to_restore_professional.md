# Restore Steps (Professional Site)

1) Move archived pages back into `pages/`.
2) Move archived layouts back into `_layouts/`.
3) Move archived includes/data back into `_includes/` and `_data/`.
4) Move archived assets back into `assets/` (preserve subfolders).
5) Restore `_config.yml` defaults for professional pages and add `professional` to the categories list.
6) Update `_includes/nav.html` to support professional/shared navigation data again.
7) Re-add the professional nav entry in `_data/nav_personal.yml` if you want a cross-link.
8) Restore professional back-links in `_layouts/project.html` if needed.
9) Rebuild the site and verify `/professional/*` routes resolve.
