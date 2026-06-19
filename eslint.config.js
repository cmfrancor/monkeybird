const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  // Reglas recomendadas de ESLint para todos los archivos JS
  js.configs.recommended,

  // Backend y archivos de configuración: corren en Node
  // (require, module, process, console...)
  {
    files: ["index.js", "eslint.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },

  // Frontend: el código de public/js corre en el navegador
  // (document, window, fetch, alert, setInterval, Image...)
  {
    files: ["public/js/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.browser,
      },
    },
  },
];
