import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	root: ".",
	base: "/homanager",
	build: {
		outDir: path.resolve("../../homanager"),
		emptyOutDir: true
	},
	resolve: {
		alias: {
			"@framework": path.resolve("../framework")
		}
	},
	server: {
		host: "localhost",
		port: 5173,
		fs: {
			allow: [".", "../framework"],
		}
	}
});