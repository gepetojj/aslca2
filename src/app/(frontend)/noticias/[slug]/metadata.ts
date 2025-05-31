import type { Metadata, ResolvingMetadata } from "next";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const { slug } = await params;

	// Buscar dados da notícia
	const payload = await getPayload({ config: payloadConfig });

	const newsQuery = await payload.find({
		collection: "news",
		where: {
			slug: {
				equals: slug,
			},
			_status: {
				equals: "published",
			},
		},
		depth: 1,
		limit: 1,
	});

	const news = newsQuery.docs[0];

	if (!news) {
		return {
			title: "Notícia não encontrada | Academia Santanense de Letras, Ciências e Artes",
			description: "A notícia solicitada não foi encontrada ou não está mais disponível.",
		};
	}
	// Obter a base URL
	const parentMetadata = await parent;
	const previousImages = parentMetadata?.openGraph?.images || [];

	// Preparar URL completa para a notícia
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aslca.org.br";
	const fullUrl = `${siteUrl}/noticias/${news.slug}`;

	// Obter primeira imagem se disponível
	let imageUrl =
		previousImages && previousImages.length > 0
			? typeof previousImages[0] === "string"
				? previousImages[0]
				: previousImages[0]
			: `${siteUrl}/api/media/placeholder.png`;

	if (news.url && typeof news.url !== "string" && news.url) {
		imageUrl = news.url;
	}

	// Formatação de data para ISO
	const datePublished = new Date(news.createdAt).toISOString();
	const dateModified = new Date(news.updatedAt).toISOString();

	return {
		title: `${news.title} | Academia Santanense de Letras, Ciências e Artes`,
		description: news.description,
		openGraph: {
			title: news.title,
			description: news.description,
			images: imageUrl ? [imageUrl, ...previousImages] : [...previousImages],
			type: "article",
			publishedTime: news.createdAt,
			modifiedTime: news.updatedAt,
			url: fullUrl,
		},
		twitter: {
			card: "summary_large_image",
			title: news.title,
			description: news.description,
			images: imageUrl ? [imageUrl] : [...previousImages],
		},
		alternates: {
			canonical: fullUrl,
		},
		// Adicionar JSON-LD para artigo de notícia
		other: {
			"json-ld": [
				JSON.stringify({
					"@context": "https://schema.org",
					"@type": "NewsArticle",
					"headline": news.title,
					"description": news.description,
					"image": imageUrl,
					"url": fullUrl,
					"datePublished": datePublished,
					"dateModified": dateModified,
					"author": {
						"@type": "Organization",
						"name": "Academia Santanense de Letras, Ciências e Artes",
						"url": siteUrl,
					},
					"publisher": {
						"@type": "Organization",
						"name": "Academia Santanense de Letras, Ciências e Artes",
						"url": siteUrl,
						"logo": {
							"@type": "ImageObject",
							"url": `${siteUrl}/logo.webp`,
						},
					},
					"mainEntityOfPage": {
						"@type": "WebPage",
						"@id": fullUrl,
					},
				}),
			],
		},
	};
}
