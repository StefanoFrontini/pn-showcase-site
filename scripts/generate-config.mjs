import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const devConfigPath = join(__dirname, "../public/conf/config-dev.json");
const devConfig = JSON.parse(readFileSync(devConfigPath, "utf-8"));

const config = {
  API_BASE_URL: process.env.API_BASE_URL ?? devConfig.API_BASE_URL,
  CLOUDFRONT_MAP_URL:
    process.env.CLOUDFRONT_MAP_URL ?? devConfig.CLOUDFRONT_MAP_URL,
  GEOLOCATION_ASSISTANCE_URL:
    process.env.GEOLOCATION_ASSISTANCE_URL ??
    devConfig.GEOLOCATION_ASSISTANCE_URL,
};

mkdirSync(join(__dirname, "../public/conf"), { recursive: true });
writeFileSync(
  join(__dirname, "../public/conf/config.json"),
  JSON.stringify(config, null, 2)
);
console.log("Generated public/conf/config.json:", JSON.stringify(config));
