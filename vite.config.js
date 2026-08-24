import { readdirSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

function getHtmlInputs(directory, inputs = {}) {
  const entries = readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      const ignoredFolders = ["node_modules", "dist", ".git"];

      if (ignoredFolders.includes(entry.name)) {
        continue;
      }

      getHtmlInputs(fullPath, inputs);
      continue;
    }

    if (entry.isFile() && extname(entry.name) === ".html") {
      const inputName = relative(root, fullPath)
        .replace(/\\/g, "/")
        .replace(".html", "");

      inputs[inputName] = fullPath;
    }
  }

  return inputs;
}

export default defineConfig({
  base: "./",

  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },

  build: {
    rollupOptions: {
      input: getHtmlInputs(root),
    },
  },
});