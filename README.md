# Ankit's Portfolio

A personal portfolio website built with React and TypeScript. It presents an introduction, background, work experience, selected projects, and contact information in a responsive, animated interface.

## Built with

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion and GSAP
- Lucide React icons

## Getting started

### Requirements

- Node.js (current LTS recommended)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite to view the site. Changes to source files are reflected through Vite's hot module replacement.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure

```text
src/
  assets/       Images and other imported assets
  components/   Portfolio sections and reusable UI components
  static/       Portfolio content, including experience entries
  App.tsx       Page composition
  index.css     Global styles
public/         Public assets, including the resume PDF
```

To update portfolio content, edit the relevant component or data file under `src/`. Public files can be referenced by their path from the site root.
