import type { Metadata, ResolvingMetadata } from "next";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const { id } = await params;
	const chairNumber = parseInt(id);

	if (isNaN(chairNumber)) {
		return {
			title: "Patrono não encontrado | Academia Santanense de Letras, Ciências e Artes",
			description: "O patrono solicitado não foi encontrado ou não está mais disponível.",
		};
	}

	// Buscar dados do patrono
	const payload = await getPayload({ config: payloadConfig });

	const patronQuery = await payload.find({
		collection: "patrons",
		where: {
			chair: {
				equals: chairNumber,
			},
		},
		depth: 1,
		limit: 1,
	});

	const patron = patronQuery.docs[0];

	if (!patron) {
		return {
			title: "Patrono não encontrado | Academia Santanense de Letras, Ciências e Artes",
			description: "O patrono solicitado não foi encontrado ou não está mais disponível.",
		};
	}
	// Obter a base URL
	const parentMetadata = await parent;
	const previousImages = parentMetadata?.openGraph?.images || [];
	const imageUrl = typeof patron.image !== "number" ? patron.image?.url : undefined;

	// Preparar URL completa para o perfil
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aslca.org.br";
	const fullUrl = `${siteUrl}/cadeiras/patronos/${patron.chair}`;

	// Preparar descrição
	const description = `Conheça ${patron.name}, patrono da Cadeira Nº ${patron.chair} da Academia Santanense de Letras, Ciências e Artes.`;

	return {
		title: `${patron.name} | Cadeira Nº ${patron.chair} | Academia Santanense de Letras, Ciências e Artes`,
		description,
		openGraph: {
			title: `${patron.name} | Cadeira Nº ${patron.chair}`,
			description,
			images: imageUrl ? [imageUrl, ...previousImages] : [...previousImages],
			type: "profile",
			url: fullUrl,
		},
		twitter: {
			card: "summary_large_image",
			title: `${patron.name} | Cadeira Nº ${patron.chair}`,
			description,
			images: imageUrl ? [imageUrl] : [...previousImages],
		},
		alternates: {
			canonical: fullUrl,
		},
		other: {
			"json-ld": [
				JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Person",
					"name": patron.name,
					"description": description,
					"image": imageUrl,
					"honorificPrefix": "Patrono",
					"mainEntityOfPage": {
						"@type": "WebPage",
						"@id": fullUrl,
					},
				}),
			],
		},
	};
}
