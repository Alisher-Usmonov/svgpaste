import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { presetUno, presetWebFonts, presetIcons } from "unocss";
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons(),
        presetWebFonts({
          provider: "google",
          fonts: {
            sans: "Inter",
          },
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
