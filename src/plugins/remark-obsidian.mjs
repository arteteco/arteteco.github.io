/**
 * Remark plugin for Obsidian-style wiki syntax.
 *
 * Supported syntax:
 *   ![[image.jpg]]             → basic image embed
 *   ![[image.jpg|300]]         → image with width=300px
 *   ![[image.jpg|300x200]]     → image with width=300px height=200px
 *   ![[image.jpg|left]]        → image floated left
 *   ![[image.jpg|right]]       → image floated right
 *   ![[image.jpg|center]]      → image centered
 *   ![[image.jpg|300|left]]    → combined width + alignment
 *   [[page]]                   → internal link to /posts/page
 *   [[page|alias]]             → internal link with custom label
 *
 *   ![](image.png)             → relative paths rewritten to /img/image.png
 *
 * Uses only packages already bundled by Astro (mdast-util-find-and-replace,
 * unist-util-visit), so no extra dependencies are needed.
 *
 * @param {object} [options]
 * @param {string} [options.imgPath='/img/']  Base path for embedded images.
 * @param {string} [options.postsPath='/posts/']  Base path for wiki-links.
 */

import { findAndReplace } from 'mdast-util-find-and-replace';
import { visit } from 'unist-util-visit';

// ![[filename]] or ![[filename|opt1|opt2...]]
const RE_EMBED = /!\[\[([^\]|]+?)((?:\|[^\]]*)*)\]\]/g;

// [[page]] or [[page|alias]] — not preceded by !
const RE_WIKILINK = /(?<!!)\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]/g;

function parseImageOptions(optStr) {
  if (!optStr) return {};
  const opts = optStr.split('|').map(s => s.trim()).filter(Boolean);
  const result = {};
  for (const opt of opts) {
    if (/^\d+x\d+$/i.test(opt)) {
      const [w, h] = opt.split('x');
      result.width = parseInt(w, 10);
      result.height = parseInt(h, 10);
    } else if (/^\d+$/.test(opt)) {
      result.width = parseInt(opt, 10);
    } else if (['left', 'right', 'center'].includes(opt.toLowerCase())) {
      result.align = opt.toLowerCase();
    }
  }
  return result;
}

function buildImageStyle({ width, height, align }) {
  const styles = [];
  if (width)  styles.push(`width:${width}px`);
  if (height) styles.push(`height:${height}px`);
  if (align === 'left')   styles.push('float:left', 'margin-right:1em');
  if (align === 'right')  styles.push('float:right', 'margin-left:1em');
  if (align === 'center') styles.push('display:block', 'margin:0 auto');
  return styles.join(';');
}

export function remarkObsidian({ imgPath = '/img/', postsPath = '/posts/' } = {}) {
  return (tree) => {
    // Rewrite relative image paths (Obsidian bare filenames) to imgPath.
    // Absolute paths (/...) and URLs (http/https) are left untouched.
    visit(tree, 'image', (node) => {
      if (!node.url.startsWith('/') && !/^https?:\/\//.test(node.url)) {
        node.url = imgPath + node.url.split('/').pop();
      }
    });

    findAndReplace(tree, [
      [
        RE_EMBED,
        (_match, filename, optStr) => {
          const opts = parseImageOptions(optStr);
          const style = buildImageStyle(opts);
          return {
            type: 'image',
            url: imgPath + filename.trim(),
            alt: filename.trim(),
            ...(style && { data: { hProperties: { style } } }),
          };
        },
      ],
      [
        RE_WIKILINK,
        (_match, link, alias) => {
          const slug = link.trim().toLowerCase().replace(/\s+/g, '-');
          return {
            type: 'link',
            url: postsPath + slug,
            children: [{ type: 'text', value: (alias ?? link).trim() }],
          };
        },
      ],
    ]);
  };
}
