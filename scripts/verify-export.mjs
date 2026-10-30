#!/usr/bin/env node
/**
 * Post-build checks for the static export in ./out.
 * Fails (exit 1) on broken internal links, missing routes or empty links.
 * Warns about content that is still pending configuration.
 */
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = join(process.cwd(), "out");
const LOCALES = ["es", "en", "ru"];
const errors = [];
const warnings = [];

if (!existsSync(OUT)) {
  console.error("✗ out/ does not exist. Run `next build` first.");
  process.exit(1);
}

// Placeholder route generated while there are no case studies.
for (const l of LOCALES) {
  const placeholder = join(OUT, l, "work", "_");
  if (existsSync(placeholder)) rmSync(placeholder, { recursive: true, force: true });
  const workDir = join(OUT, l, "work");
  if (existsSync(workDir) && readdirSync(workDir).length === 0) rmSync(workDir, { recursive: true });
}
function removeNextTxt(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      removeNextTxt(full);
      continue;
    }
    if (name.startsWith("__next") && name.endsWith(".txt")) rmSync(full);
  }
}
removeNextTxt(OUT);

const required = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "icon.svg",
  "apple-icon.png",
  "manifest.webmanifest",
  ...LOCALES.map((l) => `${l}/index.html`),
  ...LOCALES.map((l) => `${l}/og.png`),
];
for (const file of required) {
  if (!existsSync(join(OUT, file))) errors.push(`missing ${file}`);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(OUT);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const idsByFile = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  idsByFile.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

function resolveTarget(pathname) {
  const clean = decodeURIComponent(pathname.split("?")[0]);
  const candidates = clean.endsWith("/")
    ? [join(OUT, clean, "index.html")]
    : [join(OUT, clean), join(OUT, `${clean}.html`), join(OUT, clean, "index.html")];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

let linkCount = 0;

for (const file of htmlFiles) {
  const rel = relative(OUT, file);
  const html = readFileSync(file, "utf8");
  const pagePath = "/" + rel.replace(/index\.html$/, "").replace(/\\/g, "/");

  const lang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
  if (!lang) errors.push(`${rel}: <html> without lang`);

  const locale = LOCALES.find((l) => rel.startsWith(`${l}/`) || rel.startsWith(`${l}\\`));
  if (locale && rel === `${locale}/index.html`) {
    if (lang !== locale) errors.push(`${rel}: lang="${lang}", expected "${locale}"`);
    for (const l of LOCALES) {
      if (!html.includes(`hrefLang="${l}"`) && !html.includes(`hreflang="${l}"`)) {
        errors.push(`${rel}: missing hreflang ${l}`);
      }
    }
    if (!html.includes('rel="canonical"')) errors.push(`${rel}: missing canonical`);
    if (!html.includes('property="og:image"')) errors.push(`${rel}: missing og:image`);
  }

  for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"[^>]*>/g)) {
    const tag = m[0];
    const href = m[1];
    linkCount++;
    if (href === "" || href === "#" || /undefined|null/.test(href)) {
      errors.push(`${rel}: empty or invalid href "${href}"`);
      continue;
    }
    if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag)) {
      errors.push(`${rel}: target=_blank without rel=noopener (${href})`);
    }
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;

    const [pathPart, hash] = href.split("#");
    const targetFile = pathPart === "" ? file : resolveTarget(pathPart.startsWith("/") ? pathPart : pagePath + pathPart);
    if (!targetFile) {
      errors.push(`${rel}: broken link ${href}`);
      continue;
    }
    if (hash && hash !== "top" && !idsByFile.get(targetFile)?.has(hash)) {
      errors.push(`${rel}: anchor #${hash} not found in ${relative(OUT, targetFile)}`);
    }
  }

  if (html.includes("https://example.com")) {
    warnings.push(`${rel}: site URL is still https://example.com (set NEXT_PUBLIC_SITE_URL)`);
  }
  const pending = (html.match(/data-pending=""/g) ?? []).length;
  if (pending > 0 && rel === "es/index.html") {
    warnings.push(`${pending} contact channel(s) not configured yet (src/content/contact.ts)`);
  }
  if (rel === "es/index.html" && !html.includes("<picture>")) {
    warnings.push("portrait placeholder in use (src/content/profile.ts → portrait.src)");
  }
}

const unique = (list) => [...new Set(list)];

console.log(`\nStatic export check — ${htmlFiles.length} HTML files, ${linkCount} links`);
for (const w of unique(warnings)) console.log(`  ! ${w}`);
if (errors.length) {
  for (const e of unique(errors)) console.error(`  ✗ ${e}`);
  console.error(`\n✗ ${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log("  ✓ routes, links, anchors, lang and hreflang are valid.\n");
