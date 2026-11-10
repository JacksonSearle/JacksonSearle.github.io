import fs from "node:fs";
import path from "node:path";

const SHOTS_DIR = "src/assets/shots";

const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Self-contained demos (plain static files) are published as they are.
  eleventyConfig.addPassthroughCopy({ demos: "demos" });

  const url = eleventyConfig.getFilter("url");
  const pending = new Set();

  // A screenshot or short video. If the file exists in src/assets/shots/ it is
  // shown; if not, a clearly marked placeholder says what to capture.
  //   {% shot "file.png", "What to capture / alt text" %}
  function shot(file, description, variant) {
    const exists = fs.existsSync(path.join(SHOTS_DIR, file));
    const cls = variant === "thumb" ? "shot shot--thumb" : "shot";
    if (!exists) {
      pending.add(`screenshot  ${SHOTS_DIR}/${file}  (${description})`);
      return (
        `<div class="${cls} shot--missing"><strong>Placeholder</strong>` +
        `<span>${escapeHtml(description)}</span><code>assets/shots/${escapeHtml(file)}</code></div>`
      );
    }
    const src = url(`/assets/shots/${file}`);
    if (/\.(mp4|webm)$/i.test(file)) {
      return `<video class="${cls}" src="${src}" controls muted playsinline preload="metadata" aria-label="${escapeHtml(description)}"></video>`;
    }
    return `<img class="${cls}" src="${src}" alt="${escapeHtml(description)}" loading="lazy">`;
  }
  eleventyConfig.addShortcode("shot", shot);

  // A fact that still needs filling in. Shows up highlighted on the page.
  //   {% todo "number of forms completed" %}
  eleventyConfig.addShortcode("todo", (note) => {
    pending.add(`text        ${note}`);
    return `<mark class="todo">TODO: ${escapeHtml(note)}</mark>`;
  });

  eleventyConfig.addCollection("projects", (api) =>
    api.getFilteredByGlob("src/projects/*.md").sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
  );

  eleventyConfig.on("eleventy.before", () => pending.clear());
  eleventyConfig.on("eleventy.after", () => {
    if (!pending.size) return;
    console.log(`\n${pending.size} placeholder(s) still on the site:`);
    for (const p of [...pending].sort()) console.log(`  - ${p}`);
    console.log("");
  });

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
