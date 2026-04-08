# arteteco.com — Sito personale di Manuel Moscariello

Sito personale costruito con Astro, deployato su GitHub Pages con dominio custom arteteco.com.

## Stack
- **Framework:** Astro (v6+)
- **CSS:** Tailwind via @tailwindcss/vite
- **Hosting:** GitHub Pages
- **Deploy:** GitHub Actions automatico su push a master

## Struttura cartelle
src/
pages/
index.astro        # homepage — toccare raramente
content/
posts/             # post in markdown — qui si scrive
_template/       # template Obsidian, ignorato da git
content.config.ts    # schema della content collection
public/
foto.png             # foto profilo circolare
img/                 # immagini di copertina dei post
CNAME                # dominio custom
.github/workflows/
deploy.yml           # workflow GitHub Actions

## Schema dei post
Ogni post in `src/content/posts/` è un file `.md` con questo frontmatter:

```yaml
---
title: Titolo del post
date: 2025-04-08
excerpt: Una riga di descrizione per la card in homepage.
tags: [viaggi, costruzione]
cover: /img/nome-foto.jpg
---
```

Tag disponibili: viaggi, musica, gdr, natura, costruzione. Si possono usare tag multipli per post. Nuovi tag appaiono automaticamente nel filtro in homepage.

## Design system
- Tema scuro
- Colore primario: verde `#7fb87e` / `#5a8a5e`
- Colore secondario: oro `#a8864e`
- Font display: Playfair Display
- Font mono: DM Mono
- Font body: DM Sans
- Variabili CSS definite in `index.astro` nel blocco `:root`

## Pubblicare
```bash
git add .
git commit -m "descrizione"
git push
```
GitHub Actions builda e deploya automaticamente in 2-3 minuti.

## Comandi utili
```bash
npm run dev      # server locale su localhost:4321
npm run build    # build di produzione
```

## Note importanti
- La cartella `src/content/posts/_template/` è nel `.gitignore` — non viene pubblicata
- Il file `public/CNAME` contiene `arteteco.com` — non cancellarlo
- I tag nel filtro homepage sono generati dinamicamente dai post esistenti
- Le immagini di copertina vanno in `public/img/` e referenziate come `/img/nome.jpg`
