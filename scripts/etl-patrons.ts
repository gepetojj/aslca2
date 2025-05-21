import { readFile } from "fs/promises";
import { join } from "path";
import { getPayload } from "payload";

import config from "@/payload.config";

import { convertTipTapToLexical } from "./transform-tiptap-to-lexical";

(async () => {
	console.time("Extract");
	const file = await readFile(join("scripts", "data.json"), "utf-8");
	const data = JSON.parse(file);
	console.timeEnd("Extract");

	const records = data["__collections__"].patrons as Record<
		string,
		{
			avatarUrl: string;
			name: string;
			id: string;
			bio: Record<string, unknown>;
			metadata: { createdAt: number; academicId: string; chair: number; urlId: string; updatedAt: number };
		}
	>;
	const patrons = Object.values(records).sort((a, b) => a.metadata.chair - b.metadata.chair);

	const payload = await getPayload({ config });

	for (const patron of patrons) {
		console.time("Transform");
		const blob = await fetch(patron.avatarUrl).then(res => res.blob());
		const buffer = Buffer.from(await blob.arrayBuffer());
		console.timeEnd("Transform");

		console.time("Load");
		const image = await payload.create({
			collection: "media",
			data: {
				alt: patron.name,
			},
			file: {
				data: buffer,
				mimetype: blob.type,
				name: patron.name
					.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^a-z0-9-]/g, ""),
				size: buffer.byteLength,
			},
		});
		const newPatron = await payload.create({
			collection: "patrons",
			data: {
				name: patron.name,
				chair: patron.metadata.chair,
				image,
				biography: await convertTipTapToLexical(JSON.stringify({ content: patron.bio }), payload),
				createdAt: new Date(patron.metadata.createdAt).toISOString(),
				updatedAt: new Date(patron.metadata.updatedAt).toISOString(),
			},
		});
		console.timeEnd("Load");
		console.log(newPatron.id);
	}
})();
