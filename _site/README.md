# Gabrielle Gaulin — Jekyll Portfolio

This is the working portfolio converted to a Jekyll site.

## Structure

- `_config.yml` — Jekyll configuration and project collection
- `_layouts/default.html` — global shell/navigation
- `_layouts/home.html` — patchwork homepage
- `_layouts/project.html` — reusable project-page layout
- `_projects/*.md` — individual projects
- `assets/` — artwork and process images
- `style.css` — visual system
- `index.html` — homepage entry point

## Local preview

Install Ruby + Jekyll, then from this folder run:

```bash
bundle exec jekyll serve
```

If you don't have Bundler configured, you can also use:

```bash
jekyll serve
```

Then open the local address Jekyll prints, usually `http://localhost:4000`.

## Adding a new project

Create a new Markdown file in `_projects/`, for example:

```yaml
---
title: "New Project"
slug: "new-project"
category: "Painting"
year: 2026
image: "/assets/new-project.jpg"
description: "A short description."
note: "color / material / process"
materials: "oil · canvas"
gallery:
  - src: "/assets/new-project.jpg"
    alt: "Main image"
    caption: "finished work"
---
```

The project page is generated automatically from the shared `project` layout.

## Replacing the placeholder art

Put your JPG, PNG, or WebP files in `assets/`, then change the `image` and `gallery` paths in the project Markdown files.

The homepage automatically creates links to the project pages.
