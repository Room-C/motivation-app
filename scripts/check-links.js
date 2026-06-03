const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlFiles = ["index.html", "privacy.html", "eula.html", "privacy/index.html", "eula/index.html"];
const cssFiles = ["styles.css"];
const htmlUrlPatterns = [
  /(?:href|src)="([^"]+)"/g,
  /<meta[^>]+http-equiv="refresh"[^>]+content="[^"]*url=([^";]+)[^"]*"/gi,
];
const cssUrlPattern = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
const missing = [];
const rootAbsolute = [];

const shouldSkip = (target) =>
  !target ||
  target.startsWith("#") ||
  target.startsWith("//") ||
  /^[a-z][a-z0-9+.-]*:/i.test(target);

const localCandidates = (sourceFile, target) => {
  const normalized = target.split("#")[0].split("?")[0];
  const sourceDir = path.dirname(sourceFile);
  const relativeTarget = normalized.startsWith("/") ? normalized.slice(1) : path.join(sourceDir, normalized);
  const cleanTarget = path.normalize(relativeTarget);
  const candidates = [path.join(root, cleanTarget)];

  if (!path.extname(cleanTarget)) {
    candidates.push(path.join(root, `${cleanTarget}.html`));
  }

  if (normalized.endsWith("/") || !path.extname(cleanTarget)) {
    candidates.push(path.join(root, cleanTarget, "index.html"));
  }

  return candidates;
};

const checkTarget = (sourceFile, target) => {
  const trimmed = target.trim();
  if (shouldSkip(trimmed)) return;

  if (trimmed.startsWith("/")) {
    rootAbsolute.push(`${sourceFile}: ${trimmed}`);
  }

  const exists = localCandidates(sourceFile, trimmed).some((candidate) => fs.existsSync(candidate));
  if (!exists) {
    missing.push(`${sourceFile}: ${trimmed}`);
  }
};

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");

  for (const pattern of htmlUrlPatterns) {
    let match;
    while ((match = pattern.exec(html))) {
      checkTarget(file, match[1]);
    }
  }
}

for (const file of cssFiles) {
  const css = fs.readFileSync(path.join(root, file), "utf8");
  let match;

  while ((match = cssUrlPattern.exec(css))) {
    const target = match[1];
    checkTarget(file, target);
  }
}

if (rootAbsolute.length) {
  console.error("Root-relative local URLs are not compatible with project GitHub Pages:");
  for (const item of rootAbsolute) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

if (missing.length) {
  console.error("Missing local targets:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("All local links and assets resolve.");
