# INDoS website instructions

## Build and validation

This is a Jekyll 4 static site. Dependencies are managed by Bundler; an isolated Ruby environment is also available through Pixi.

```bash
# Install Bundler dependencies locally
bundle config set --local path 'vendor/bundle'
bundle install

# Build the complete site (the repository's available validation command)
bundle exec jekyll build

# Serve with incremental builds and live reload
bundle exec jekyll serve --incremental --livereload

# Equivalent isolated-environment commands
pixi run install
pixi run serve
```

There is no automated test suite, single-test command, or configured linter. Jekyll builds the whole site; use `bundle exec jekyll build` after changes that affect rendering.

## Architecture

- Root `*.md` files are Jekyll pages. `_config.yml` applies `_layouts/default.html` to every page, unless its front matter changes the behavior. The layout supplies the shared header, footer, Bootstrap CDN assets, site CSS, analytics, and SEO metadata; rendered output is generated in `_site/` and must not be edited.
- Site-wide navigation comes from `_data/navigation.yaml` and is rendered by `_includes/header`. Each entry's `url` is the site route and its `match` drives the active navigation state. Add a new public page to this data file when it should appear in navigation.
- `_data/members.yaml` is the canonical source for member and coordination records. Coordinators have stable `id` values plus `coordination`, `photo`, and `coordination_order` fields; `_includes/person` resolves these records by `id`. Pages such as `coordination.md`, `about.md`, and `training.md` render the shared records with display options.
- `_data/members.yaml` and `_data/institutions.yaml` are serialized by `members.md`. `assets/script/members.js` uses the institution coordinates for Leaflet markers and filters member cards by their `name`, `institution`, and `country` fields; `assets/css/members.css` styles that page. Keep each member's `institution` and `country` values aligned with its matching institution record.
- The calendar page embeds `assets/calendar.ics`. `.github/workflows/calendar.yml` refreshes it hourly or on manual dispatch by running `.github/scripts/calendar.py` with `CALENDAR_URL` from a repository secret or variable. The script deliberately replaces meeting URLs in calendar location/description fields before publishing, so preserve that sanitization when changing the sync.

## Repository conventions

- Start pages with YAML front matter containing `title`. Use `hide_title: true` only when the page provides its own visible `<h1>`; use `redirect: /route` for the layout's immediate redirect behavior.
- Use `{{ '/assets/...' | relative_url }}` for site asset references in Liquid-aware Markdown/HTML so links remain compatible with the configured Jekyll base URL. Use extensionless internal page routes, such as `/training`.
- Data files are YAML lists, with one object per person, lab, or navigation item. Preserve the existing field names, indentation, and list structure; template and JavaScript lookups use these names directly.
- The `person` include accepts `id` and optional `coordination`, `photo`, `email`, `institution` (`"yes"`/`"no"`), plus `tag` (pipe-separated) and `class`. Prefer it over duplicating details that belong in `_data/members.yaml`.
- `assets/script/fold-sections.js` turns every `<h2>` in `.page-content` into a collapsible section. Pages that load it may pass space-separated heading IDs through `data-open`; place `data-fold-end` on an element when remaining content must stay outside the folds.
- Global visual rules, including INDoS color variables and shared component classes, are in `assets/css/style.css`. Page-specific Members map/filter styles remain in `assets/css/members.css`; Leaflet is vendored under `assets/leaflet/`.
