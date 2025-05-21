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

	return {
		title: `${post.title} | Academia Santanense de Letras, Ciências e Artes`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			images: [...previousImages],
			type: "article",
			publishedTime: post.createdAt,
			modifiedTime: post.updatedAt,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [...previousImages],
		},
	};
}
