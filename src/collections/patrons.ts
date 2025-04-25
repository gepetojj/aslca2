import type { CollectionConfig } from "payload";

export const Patrons: CollectionConfig = {
	slug: "patrons",
	access: {
		read: () => true,
		create: ({ req: { user } }) => !!user && user.role === "admin",
		update: ({ req: { user } }) => !!user && user.role === "admin",
		delete: ({ req: { user } }) => !!user && user.role === "admin",
	},
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			label: "Nome",
			name: "name",
			required: true,
			type: "text",
			unique: true,
			admin: {
				placeholder: "Nome do patrono",
			},
		},
		{
			label: "Cadeira",
			name: "chair",
			required: true,
			type: "number",
			min: 1,
			unique: true,
			admin: {
				placeholder: "Número da cadeira",
			},
		},
		{
			label: "Acadêmico",
			name: "academic",
			type: "relationship",
			relationTo: "academics",
			unique: true,
			hasMany: false,
		},
		{
			label: "Imagem",
			name: "image",
			required: true,
			type: "upload",
			relationTo: "media",
		},
		{
			label: "Biografia",
			name: "biography",
			type: "richText",
			required: true,
		},
	],
	labels: {
		singular: "Patrono",
		plural: "Patronos",
	},
};
