import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";
import react from "@vitejs/plugin-react-swc";
import resolve from "vite-plugin-resolve";
import { viteDevPlugin } from "./build/plugins/viteForElectronDevPlugin.js";
import { viteProPlugin } from "./build/plugins/viteForElectronProPlugin.js";

function transform2ESM() {
  // node 模块
  const needTransform2ESModules = [
    "os",
    "fs",
    "path",
    "events",
    "child_process",
    "crypto",
    "http",
    "buffer",
    "url",
    "better-sqlite3",
    "knex",
  ];
  const result = {};
  for (const name of needTransform2ESModules) {
    result[
      name
    ] = `const ${name} = require(${name}); export { ${name} as default }`;
  }
  // electron 内置模块
  const electronBuiltInModules = ["ipcRenderer", "shell"].join(",");
  result.electron = `
  const { ${electronBuiltInModules} } = require('electron');
  export {${electronBuiltInModules}};
  `;
  return result;
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
  },
  css: {
    postcss: {
      plugins: [require("postcss-nesting")]
    }
  },
  plugins: [
    viteDevPlugin(),
    resolve(transform2ESM()),
    Icons({ jsx: "react", compiler: "jsx", autoInstall: true }),
    react(),
  ],
  build: {
    target: ["chrome112"],
    rollupOptions: {
      plugins: [viteProPlugin()],
    },
  },
});
