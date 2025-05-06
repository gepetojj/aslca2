import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Academics: CollectionConfig = {
	slug: "academics",
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
				placeholder: "Nome do acadêmico",
			},
		},
		{
			label: "Tipo",
			name: "type",
			type: "select",
			options: [
				{
					label: "Efetivo",
					value: "active",
				},
				{
					label: "Benemérito",
					value: "benemeritus",
				},
				{
					label: "Honorário",
					value: "honorary",
				},
				{
					label: "Correspondente",
					value: "correspondent",
				},
				{
					label: "In Memoriam",
					value: "inMemoriam",
				},
			],
			defaultValue: "active",
			required: true,
			hasMany: false,
			admin: {
				isClearable: false,
				isSortable: false,
			},
		},
		{
			label: "Patrono",
			name: "patron",
			type: "join",
			collection: "patrons",
			on: "academic",
			defaultLimit: 1,
			admin: {
				defaultColumns: ["name", "chair"],
				allowCreate: false,
			},
		},
		{
			label: "Usuário representante",
			name: "user",
			type: "relationship",
			relationTo: "users",
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
	hooks: {
		afterChange: [
			() => {
				revalidatePath("/");
			},
		],
	},
	labels: {
		singular: "Acadêmico",
		plural: "Acadêmicos",
	},
};
