import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	admin: {
		useAsTitle: "name",
	},
	auth: {
		lockTime: 5 * 60, // 5 minutos
		maxLoginAttempts: 5,
	},
	fields: [
		{
			label: "Nome",
			name: "name",
			required: true,
			type: "text",
		},
		{
			label: "Cargo",
			name: "role",
			type: "select",
			options: [
				{
					label: "Usuário",
					value: "user",
				},
				{
					label: "Administrador",
					value: "admin",
				},
			],
			defaultValue: "user",
			required: true,
			hasMany: false,
			admin: {
				isClearable: false,
				isSortable: false,
			},
		},
		{
			label: "Acadêmico representado",
			name: "academic",
			type: "join",
			collection: "academics",
			on: "user",
			defaultLimit: 1,
			admin: {
				defaultColumns: ["name", "chair"],
				allowCreate: false,
			},
		},
	],
	labels: {
		plural: "Usuários",
		singular: "Usuário",
	},
};
