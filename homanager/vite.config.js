import { defineConfig } from 'vite';
import path from "node:path";

export default defineConfig({
	root: ".",
	base: "/homanager/",
	resolve: {
		alias: {
			"@framework": path.resolve('../framework')
		}
	},
	server: {
		host: 'localhost',
		port: 5173,
		fs: {
			allow: [".", "../framework"],
		}
	}
});