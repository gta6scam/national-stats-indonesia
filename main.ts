// AngkaNusa — main.ts (ditulis sendiri dari nol untuk bounty ini)
// Entrypoint hand-in: menyalin app/ + screenshots/ ke MAKEFUN_OUTPUT_DIR
// lalu menulis dossier.json lewat buildDossier dari vendor kit.
//
// Cara pakai:
//   MAKEFUN_OUTPUT_DIR=/tmp/out-stats-yutulboy-a node main.ts
// (Node 22; standard library saja; tanpa dependensi eksternal.)
import { cp, mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const REPO_ROOT = resolve(import.meta.dirname);
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const DOSSIER_OPTIONS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

async function copySiteInto(outputDir: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });
  await cp(join(REPO_ROOT, "app"), join(outputDir, "app"), { recursive: true });
  await cp(join(REPO_ROOT, "screenshots"), join(outputDir, "screenshots"), {
    recursive: true,
  });
}

async function main(): Promise<void> {
  await copySiteInto(OUTPUT_DIR);
  // buildDossier(rootDir, caps) -> Uint8Array berisi dossier.json.
  const dossier = await buildDossier(REPO_ROOT, DOSSIER_OPTIONS);
  await writeFile(join(OUTPUT_DIR, "dossier.json"), dossier);
  console.log(`AngkaNusa hand-in written to ${OUTPUT_DIR}`);
}

await main();
