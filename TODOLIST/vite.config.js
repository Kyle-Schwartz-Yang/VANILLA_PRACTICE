import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import pugPlugin from "vite-plugin-pug";
import path from "path";

export default defineConfig({
  plugins: [
    pugPlugin({
      pretty: true, // Для зручного читання HTML
      locals: {}, // Передача змінних у Pug
    }),
    ViteImageOptimizer(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/assets/"),
      "@app": path.resolve(__dirname, "./src/components/app/"),
      "@pages": path.resolve(__dirname, "./src/components/pages/"),
      "@widgets": path.resolve(__dirname, "./src/components/widgets/"),
      "@features": path.resolve(__dirname, "./src/components/features/"),
      "@entities": path.resolve(__dirname, "./src/components/features/"),
      "@shared": path.resolve(__dirname, "./src/components/shared/"),
    },
  },

  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        login: path.resolve(
          __dirname,
          "./src/components/pages/login/index.html"
        ),
        about: path.resolve(
          __dirname,
          "./src/components/pages/about/index.html"
        ),
        contact: path.resolve(
          __dirname,
          "./src/components/pages/contacts/index.html"
        ),
      },
    },
  },
});
