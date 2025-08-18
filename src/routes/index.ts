import { type Application } from "express";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (app: Application) {
  const files = fs.readdirSync(__dirname);
  
  for (const file of files) {
    // Skip index + declaration files
    if (
      file === "index.ts" ||
      file === "index.js" ||
      file.endsWith(".d.ts") ||
      !file.endsWith(".js")
    ) {
      continue;
    }
    
    const modulePath = path.join(__dirname, file);

      
    // Convert absolute path → file:// URL for import()
    const imported = await import(pathToFileURL(modulePath).href);
const routeFn = imported.default ?? imported; // fallback if CJS
if (typeof routeFn === "function") {
  routeFn(app);
}
  }
}
