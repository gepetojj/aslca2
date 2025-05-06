import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
	slug: "events",
	access: {
		read: () => true,
		create: ({ req: { user } }) => !!user && user.role === "admin",
		update: ({ req: { user } }) => !!user && user.role === "admin",
		delete: ({ req: { user } }) => !!user && user.role === "admin",
	},
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			label: "Título",
			name: "title",
			required: true,
			type: "text",
			admin: {
				placeholder: "Título do evento",
			},
		},
		{
			label: "Descrição",
			name: "description",
			required: false,
			type: "text",
			admin: {
				placeholder: "Descrição do evento",
			},
		},
		{
			label: "Localização",
			name: "location",
			required: true,
			type: "text",
			admin: {
				placeholder: "Localização do evento",
			},
		},
		{
			label: "Data do evento",
			name: "date",
			type: "date",
			required: true,
			index: true,
			admin: {
				date: {
					displayFormat: "d 'de' MMM 'de' yyy 'às' HH:mm",
					timeFormat: "HH:mm",
					pickerAppearance: "dayAndTime",
				},
				placeholder: "Data do evento",
			},
		},
	],
	hooks: {
		afterChange: [
			() => {
				revalidatePath("/");
				revalidatePath("/eventos");
			},
		],
	},
	labels: {
		singular: "Evento",
		plural: "Eventos",
	},
};
