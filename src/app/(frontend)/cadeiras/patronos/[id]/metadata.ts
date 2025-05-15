import type { Metadata, ResolvingMetadata } from "next";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";

interface Props {
	params: {
		id: string;
	};
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const id = params.id;
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

	return {
		title: `${patron.name} | Cadeira Nº ${patron.chair} | Academia Santanense de Letras, Ciências e Artes`,
		description: `Conheça ${patron.name}, patrono da Cadeira Nº ${patron.chair} da Academia Santanense de Letras, Ciências e Artes.`,
		openGraph: {
			title: `${patron.name} | Cadeira Nº ${patron.chair}`,
			description: `Conheça ${patron.name}, patrono da Cadeira Nº ${patron.chair} da Academia Santanense de Letras, Ciências e Artes.`,
			images: imageUrl ? [imageUrl, ...previousImages] : [...previousImages],
			type: "profile",
		},
		twitter: {
			card: "summary_large_image",
			title: `${patron.name} | Cadeira Nº ${patron.chair}`,
			description: `Conheça ${patron.name}, patrono da Cadeira Nº ${patron.chair} da Academia Santanense de Letras, Ciências e Artes.`,
			images: imageUrl ? [imageUrl, ...previousImages] : [...previousImages],
		},
	};
}
