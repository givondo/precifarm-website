// Lets node --test load the site's TypeScript modules: resolves the "@/..." alias and extensionless
// imports to files in the repository. Node 22 strips the types itself.
import { registerHooks } from "node:module";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve as resolvePath } from "node:path";

const root = resolvePath(fileURLToPath(new URL("../..", import.meta.url)));
const candidates = (base) => [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`];
const firstFile = (base) => candidates(base).find((p) => existsSync(p) && statSync(p).isFile());

registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith("@/")) {
      const file = firstFile(resolvePath(root, specifier.slice(2)));
      if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
    }
    if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
      const file = firstFile(resolvePath(fileURLToPath(new URL(".", context.parentURL)), specifier));
      if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
    }
    return next(specifier, context);
  },
});
