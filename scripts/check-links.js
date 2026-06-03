const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlFiles = ["index.html", "privacy.html", "eula.html"];
const assetPattern = /(?:href|src)="([^"]+)"/g;
const missing = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  let match;

  while ((match = assetPattern.exec(html))) {
    const target = match[1];
    if (!target.startsWith("/") || target.startsWith("//")) continue;
    if (target === "/" || target.startsWith("/#")) continue;

    const normalized = target.split("#")[0].split("?")[0];
    const mapped =
      normalized === "/privacy"
        ? "/privacy.html"
        : normalized === "/eula"
          ? "/eula.html"
          : normalized;
    const absolute = path.join(root, mapped);

    if (!fs.existsSync(absolute)) {
      missing.push(`${file}: ${target}`);
    }
  }
}

if (missing.length) {
  console.error("Missing local targets:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("All local links and assets resolve.");
