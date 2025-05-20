import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Commendations: CollectionConfig = {
	slug: "commendations",
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
				placeholder: "Nome da pessoa homenageada",
			},
		},
		{
			label: "Tipo",
			name: "type",
			type: "select",
			options: [
				{
					label: "Civil",
					value: "civil",
				},
				{
					label: "Literário",
					value: "literary",
				},
				{
					label: "Artístico",
					value: "artistic",
				},
				{
					label: "Científico",
					value: "scientific",
				},
			],
			defaultValue: "civil",
			required: true,
			hasMany: false,
			admin: {
				isClearable: false,
				isSortable: false,
			},
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
	hooks: {
		afterChange: [
			() => {
				revalidatePath("/");
				revalidatePath("/comendas");
			},
		],
	},
	labels: {
		singular: "Comenda",
		plural: "Comendas",
	},
};
