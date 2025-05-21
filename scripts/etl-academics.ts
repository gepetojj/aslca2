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

	const records = data["__collections__"].academics as Record<
		string,
		{
			avatarUrl: string;
			name: string;
			id: string;
			bio: Record<string, unknown>;
			metadata: {
				createdAt: number;
				patronId: string;
				chair: number;
				urlId: string;
				updatedAt: number;
				type: "primary" | "meritorious" | "correspondent" | "honorary" | "deceased";
			};
		}
	>;
	const academics = Object.values(records).sort((a, b) => a.metadata.chair - b.metadata.chair);

	const payload = await getPayload({ config });

	for (const academic of academics) {
		console.time("Transform");
		const blob = await fetch(academic.avatarUrl).then(res => res.blob());
		const buffer = Buffer.from(await blob.arrayBuffer());
		console.timeEnd("Transform");

		console.time("Load");
		const image = await payload.create({
			collection: "media",
			data: {
				alt: academic.name,
			},
			file: {
				data: buffer,
				mimetype: blob.type,
				name: academic.name
					.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^a-z0-9-]/g, ""),
				size: buffer.byteLength,
			},
		});
		const typeMap = {
			primary: "active",
			meritorious: "benemeritus",
			correspondent: "correspondent",
			honorary: "honorary",
			deceased: "inMemoriam",
		} as const;
		const newPatron = await payload.create({
			collection: "academics",
			data: {
				name: academic.name,
				type: typeMap[academic.metadata.type],
				image,
				biography: await convertTipTapToLexical(JSON.stringify({ content: academic.bio }), payload),
				createdAt: new Date(academic.metadata.createdAt).toISOString(),
				updatedAt: new Date(academic.metadata.updatedAt).toISOString(),
			},
		});
		console.timeEnd("Load");
		console.log(newPatron.id);
	}
})();
