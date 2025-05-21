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

	const records = data["__collections__"].blogPosts as Record<
		string,
		{
			id: string;
			title: string;
			description: string;
			thumbnailUrl: string;
			content: Record<string, unknown>;
			metadata: { createdAt: number; urlId: string; updatedAt: number };
		}
	>;
	const posts = Object.values(records).sort((a, b) => b.metadata.createdAt - a.metadata.createdAt);

	const payload = await getPayload({ config });

	for (const record of posts) {
		console.time("Transform");
		const blob = await fetch(record.thumbnailUrl).then(res => res.blob());
		const buffer = Buffer.from(await blob.arrayBuffer());
		console.timeEnd("Transform");

		console.time("Load");
		const content = await convertTipTapToLexical(JSON.stringify({ content: record.content }), payload);
		// console.log(JSON.stringify(content, null, 2));
		const newPatron = await payload.create({
			collection: "blog-posts",
			data: {
				_status: "published",
				title: record.title,
				slug: record.metadata.urlId,
				description: record.description,
				content,
				createdAt: new Date(record.metadata.createdAt).toISOString(),
				updatedAt: new Date(record.metadata.updatedAt).toISOString(),
			},
			file: {
				data: buffer,
				mimetype: blob.type,
				name: record.metadata.urlId,
				size: buffer.byteLength,
			},
		});
		console.timeEnd("Load");
		console.log(newPatron.id);
	}
})();
