import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: "alt",
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
			label: "Texto alternativo",
			admin: {
				placeholder: "Descreva a mídia para leitores de tela",
			},
		},
	],
	labels: {
		singular: "Mídia",
		plural: "Mídias",
	},
	upload: {
		crop: true,
		focalPoint: true,
	},
};
