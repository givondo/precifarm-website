// Removes generated Next.js route types before `tsc`. They are rebuilt by `next dev` and
// `next build`; stale copies from deleted pages otherwise fail the type check.
import { rmSync, existsSync } from "node:fs";

for (const dir of [".next/types", ".next/dev/types"]) {
  if (!existsSync(dir)) continue;
  try {
    rmSync(dir, { recursive: true, force: true });
    console.log(`cleared ${dir}`);
  } catch (e) {
    console.error(`Could not clear ${dir} (${e.code}). Stop the dev server (Ctrl+C) and run again.`);
    process.exit(1);
  }
}
