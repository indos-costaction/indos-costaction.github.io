# INDoS COST Action

This repository contains the website for the INDoS COST Action.

## About

Improving Neuroimaging Data for Sharing (INDoS) is a European [COST Action](https://www.cost.eu) ([CA24161](https://www.cost.eu/actions/CA24148/)) dedicated to transforming how human neuroimaging data is shared, standardized, and reused. The Action develops guidelines, tools, training materials, and best practices for [FAIR](https://www.go-fair.org/fair-principles/) neuroimaging data sharing.

## License

The website content is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.en).

## Website development

### Managing the content

Please note that most website content is formatted in plain [Markdown](https://www.markdownguide.org/getting-started/) format and you don't need to know much about HTML. There are a few things for which we use some HTML, such as for the formatting of cards, or the images.

- **Edit content**: Modify the Markdown files (`index.md`, `coordination.md`, `working-groups.md`, etc.)
- **Styling**: Edit `assets/css/style.css`
- **Navigation**: Update `_data/navigation.yaml`
- **People data**: Edit `_data/people.yaml`

### Running it locally

You can build and open the website on your own computer, prior to committing any changes to this repository on GitHub. This allows you to try things out and to check the formatting.

```bash
# Install dependencies
bundle config set --local path 'vendor/bundle'
bundle install

# Serve locally
bundle exec jekyll serve --incremental --livereload
```

Visit `http://localhost:4000` to view the site.

### Deployment

The site auto-deploys via GitHub Pages when pushing to the main branch of this repository on GitHub.

## Project structure

```console
.
├── index.md
├── coordination.md
├── working-groups.md
├── news.md
├── contact.md
├── _data/
│   ├── navigation.yaml
│   └── people.yaml
├── _layouts/
├── _includes/
│   ├── header
│   ├── footer
│   ├── person
│   └── plausible
├── assets/
│   ├── css/
│   └── images/
└── _config.yml
```

### Adding Pages

1. Create `.md` file with front matter, followed by Markdown formatted content:

   ```yaml
   ---
   layout: default
   title: Page Title
   ---
   ```

2. Add navigation link in `_data/navigation.yaml`
