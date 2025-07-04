import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { join, extname } from "https://deno.land/std@0.224.0/path/mod.ts";

// Obtenção de parâmetros via linha de comando: base=/homanager dir=../backend/public/homanager
const args = new URLSearchParams(Deno.args.join("&"));

const BASE_PATH = args.get("base") || "/";
const ROOT_DIR = args.get("dir") || "dist";
const PORT = Number(args.get("port") || "4507");

function getMimeType(path) {
	const ext = extname(path);
	switch (ext) {
		case ".js":
			return "application/javascript";
		case ".css":
			return "text/css";
		case ".html":
			return "text/html";
		case ".svg":
			return "image/svg+xml";
		case ".png":
			return "image/png";
		case ".ico":
			return "image/x-icon";
		case ".json":
			return "application/json";
		default:
			return "application/octet-stream";
	}
}

serve(async (req) => {
	const url = new URL(req.url);
	let pathname = url.pathname;

	// Restringe acesso à base configurada
	if (!pathname.startsWith(BASE_PATH)) {
		return new Response("Not Found", { status: 404 });
	}

	const relativePath = pathname.slice(BASE_PATH.length) || "/";
	let filePath = join(ROOT_DIR, relativePath);

	try {
		const fileInfo = await Deno.stat(filePath);
		if (fileInfo.isDirectory) {
			filePath = join(filePath, "index.html");
		}
	} catch {
		// Se o caminho tem extensão, retorna 404
		if (extname(relativePath)) {
			return new Response("Not Found", { status: 404 });
		}
		// fallback: SPA (Single Page App)
		filePath = join(ROOT_DIR, "index.html");
	}

	try {
		const file = await Deno.readFile(filePath);
		const mime = getMimeType(filePath);
		return new Response(file, {
			headers: { "Content-Type": mime }
		});
	} catch {
		return new Response("Not Found", { status: 404 });
	}
}, { port: PORT });

console.log(`🚀 Servindo em http://localhost:${PORT}${BASE_PATH}`);