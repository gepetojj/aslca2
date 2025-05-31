import { MetadataRoute } from "next";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aslca.org.br";

	// Páginas estáticas
	const staticPages = [
		{
			url: `${baseUrl}`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1.0,
		},
		{
			url: `${baseUrl}/sobre/historia`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/sobre/estatuto`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/cadeiras/academicos`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/cadeiras/patronos`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/comenda`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/noticias`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/eventos`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/contato`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
	] as const;

	// Carregar o Payload para obter dados dinâmicos
	const payload = await getPayload({ config: payloadConfig });

	// Obter todas as notícias publicadas
	const { docs: news } = await payload.find({
		collection: "news",
		where: {
			_status: {
				equals: "published",
			},
		},
		limit: 100,
	});

	const newsUrls = news.map(
		item =>
			({
				url: `${baseUrl}/noticias/${item.slug}`,
				lastModified: new Date(item.updatedAt),
				changeFrequency: "weekly",
				priority: 0.8,
			}) as const,
	);

	// Obter todos os posts de blog publicados
	const { docs: blogPosts } = await payload.find({
		collection: "blog-posts",
		where: {
			_status: {
				equals: "published",
			},
		},
		limit: 100,
	});

	const blogUrls = blogPosts.map(
		item =>
			({
				url: `${baseUrl}/blog/${item.slug}`,
				lastModified: new Date(item.updatedAt),
				changeFrequency: "weekly",
				priority: 0.8,
			}) as const,
	);

	// Obter todos os acadêmicos
	const { docs: academics } = await payload.find({
		collection: "academics",
		limit: 100,
	});

	const academicsUrls = academics.map(
		item =>
			({
				url: `${baseUrl}/cadeiras/academicos/${item.id}`,
				lastModified: new Date(item.updatedAt),
				changeFrequency: "monthly",
				priority: 0.7,
			}) as const,
	);

	// Obter todos os patronos
	const { docs: patrons } = await payload.find({
		collection: "patrons",
		limit: 100,
	});

	const patronsUrls = patrons.map(
		item =>
			({
				url: `${baseUrl}/cadeiras/patronos/${item.chair}`,
				lastModified: new Date(item.updatedAt),
				changeFrequency: "monthly",
				priority: 0.7,
			}) as const,
	);

	// Obter todas as comendas
	const { docs: commendations } = await payload.find({
		collection: "commendations",
		limit: 100,
	});

	const commendationsUrls = commendations.map(
		item =>
			({
				url: `${baseUrl}/comenda/${item.id}`,
				lastModified: new Date(item.updatedAt),
				changeFrequency: "monthly",
				priority: 0.7,
			}) as const,
	);

	// Unir todas as URLs
	return [...staticPages, ...newsUrls, ...blogUrls, ...academicsUrls, ...patronsUrls, ...commendationsUrls];
}
