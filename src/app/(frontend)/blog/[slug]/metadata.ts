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

	const payload = await getPayload({ config: payloadConfig });
	const newsQuery = await payload.find({
		collection: "blog-posts",
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

	const post = newsQuery.docs[0];
	if (!post) {
		return {
			title: "Postagem não encontrada | Academia Santanense de Letras, Ciências e Artes",
			description: "A postagem solicitada não foi encontrada ou não está mais disponível.",
		};
	}
	const parentMetadata = await parent;
	const previousImages = parentMetadata?.openGraph?.images || [];

	// Preparar URL completa para o artigo
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aslca.org.br";
	const fullUrl = `${siteUrl}/blog/${post.slug}`;

	// Obter primeira imagem se disponível
	let imageUrl =
		previousImages && previousImages.length > 0
			? typeof previousImages[0] === "string"
				? previousImages[0]
				: previousImages[0]
			: `${siteUrl}/api/media/placeholder.png`;

	if (post.url && typeof post.url !== "string" && post.url) {
		imageUrl = post.url;
	}

	// Formatação de data para ISO
	const datePublished = new Date(post.createdAt).toISOString();
	const dateModified = new Date(post.updatedAt).toISOString();

	return {
		title: `${post.title} | Academia Santanense de Letras, Ciências e Artes`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			images: imageUrl ? [imageUrl, ...previousImages] : [...previousImages],
			type: "article",
			publishedTime: post.createdAt,
			modifiedTime: post.updatedAt,
			url: fullUrl,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: imageUrl ? [imageUrl] : [...previousImages],
		},
		alternates: {
			canonical: fullUrl,
		},
		// Adicionar JSON-LD para artigo
		other: {
			"json-ld": [
				JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					"headline": post.title,
					"description": post.description,
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
