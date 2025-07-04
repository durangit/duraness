export const assetsToCache = Object.keys(
	import.meta.glob('/homanager/**/*.{js,css,html,png,svg,json}', { eager: true })
);