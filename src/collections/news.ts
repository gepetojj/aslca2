import { randomInt } from "crypto";
import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";
import slugify from "slugify";

export const News: CollectionConfig = {
	slug: "news",
	access: {
		read: ({ req }) => {
			if (req.user) return true;
			return {
				_status: {
					equals: "published",
				},
			};
		},
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
				placeholder: "Título da notícia",
			},
		},
		{
			label: "Título amigável para URL",
			name: "slug",
			type: "text",
			unique: true,
			admin: {
				placeholder: "exemplo-de-noticia",
				description: "Deixe em branco para gerar automaticamente a partir do título",
			},
			hooks: {
				beforeValidate: [
					({ data }) => {
						if (data?.title) return slugify(data.title, { lower: true });
						return data?.slug;
					},
				],
				beforeDuplicate: [
					({ value }) => {
						value = slugify(value, { lower: true }) + "-" + randomInt(1000, 9999);
						return value;
					},
				],
			},
			validate: (value?: string | null) => {
				if (!value) return "Título amigável é obrigatório";
				if (value.length < 3) return "Título amigável deve ter pelo menos 3 caracteres";
				if (value.length > 300) return "Título amigável deve ter no máximo 300 caracteres";
				if (value.startsWith("-") || value.endsWith("-"))
					return "Título amigável não pode começar ou terminar com hífen";
				if (value.includes(" ")) return "Título amigável não pode conter espaços";
				return true;
			},
			maxLength: 300,
			minLength: 3,
		},
		{
			label: "Descrição",
			name: "description",
			required: true,
			type: "text",
		},
		{
			label: "Autor(a)",
			name: "author",
			type: "relationship",
			relationTo: "users",
			hasMany: false,
		},
		{
			label: "Conteúdo",
			name: "content",
			type: "richText",
			required: true,
		},
	],
	hooks: {
		afterChange: [
			() => {
				revalidatePath("/");
				revalidatePath("/noticias");
				revalidatePath("/noticias/[slug]", "page");
			},
		],
	},
	labels: {
		singular: "Notícia",
		plural: "Notícias",
	},
	upload: {
		imageSizes: [
			{
				name: "small",
				width: 300,
				height: 150,
			},
			{
				name: "large",
				width: 612,
				height: undefined,
			},
		],
		adminThumbnail: "small",
		mimeTypes: ["image/*"],
		bulkUpload: false,
	},
	versions: {
		maxPerDoc: 5,
		drafts: {
			autosave: true,
			schedulePublish: true,
		},
	},
};
