// module.exports = {
//   output: "export",
//   webpack: (cfg) => {
//     cfg.module.rules.push({
//       test: /\.md$/,
//       loader: "frontmatter-markdown-loader",
//       options: { mode: ["react-component"] },
//     });
//     return cfg;
//   },
// };

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = withNextra();
