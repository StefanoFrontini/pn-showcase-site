import { mkdirSync, writeFileSync } from "fs";

const required = [
  "API_BASE_URL",
  "CLOUDFRONT_MAP_URL",
  "GEOLOCATION_ASSISTANCE_URL",
];

const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const config = {
  API_BASE_URL: process.env.API_BASE_URL,
  CLOUDFRONT_MAP_URL: process.env.CLOUDFRONT_MAP_URL,
  GEOLOCATION_ASSISTANCE_URL: process.env.GEOLOCATION_ASSISTANCE_URL,
};

mkdirSync("public/conf", { recursive: true });
writeFileSync("public/conf/config.json", JSON.stringify(config, null, 2));
console.log("Generated public/conf/config.json");
