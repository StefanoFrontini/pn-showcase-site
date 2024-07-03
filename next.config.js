const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  distDir: "build",
  transpilePackages: ["@pagopa/mui-italia"],
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
  },
};

module.exports = nextConfig;
