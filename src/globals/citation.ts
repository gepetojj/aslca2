import { GlobalConfig } from "payload";

export const Citation: GlobalConfig = {
	slug: "citation",
	access: {
		read: () => true,
		update: ({ req: { user } }) => !!user && user.role === "admin",
	},
	admin: {
		description: "Citação que aparece na página inicial.",
	},
	fields: [
		{
			name: "author",
			label: "Autor(a)",
			type: "text",
			required: true,
			admin: {
				placeholder: "Nome do(a) autor(a)",
			},
		},
		{
			name: "text",
			label: "Texto da citação",
			type: "richText",
			required: true,
		},
	],
	label: {
		singular: "Citação",
		plural: "Citações",
	},
};
