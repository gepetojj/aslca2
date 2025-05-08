import type { Metadata, ResolvingMetadata } from "next";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const slug = params.slug;

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

	return {
		title: `${news.title} | Academia Santanense de Letras, Ciências e Artes`,
		description: news.description,
		openGraph: {
			title: news.title,
			description: news.description,
			images: [...previousImages],
			type: "article",
			publishedTime: news.createdAt,
			modifiedTime: news.updatedAt,
		},
		twitter: {
			card: "summary_large_image",
			title: news.title,
			description: news.description,
			images: [...previousImages],
		},
	};
}
