import { revalidatePath } from "next/cache";
import { GlobalConfig } from "payload";

export const Gallery: GlobalConfig = {
	slug: "gallery",
	access: {
		read: () => true,
		update: ({ req: { user } }) => !!user && user.role === "admin",
	},
	hooks: {
		afterChange: [
			() => {
				revalidatePath("/");
			},
		],
	},
	admin: {
		description: "Imagens que aparecem na tela inicial.",
	},
	fields: [
		{
			name: "images",
			label: "Imagens",
			type: "upload",
			relationTo: "media",
			required: true,
			hasMany: true,
			displayPreview: true,
			filterOptions: {
				mimeType: { contains: "image" },
			},
		},
	],
	label: {
		singular: "Galeria",
		plural: "Galeria",
	},
};
