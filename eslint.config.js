import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        IntersectionObserver: "readonly",
        ResizeObserver: "readonly",
        navigator: "readonly",
        matchMedia: "readonly",
        HTMLElement: "readonly",
        CustomEvent: "readonly",
        fetch: "readonly",
        URL: "readonly",
        AbortController: "readonly",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "args",
            "attach",
            "castShadow",
            "receiveShadow",
            "position",
            "rotation",
            "scale",
            "intensity",
            "geometry",
            "material",
            "roughness",
            "metalness",
            "transparent",
            "side",
            "opacity",
          ],
        },
      ],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  prettierConfig,
];
