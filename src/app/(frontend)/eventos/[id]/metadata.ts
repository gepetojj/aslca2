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

	// Buscar dados do evento
	const payload = await getPayload({ config: payloadConfig });

	let event;
	try {
		event = await payload.findByID({
			collection: "events",
			id: parseInt(id),
			depth: 1,
		});
	} catch {
		return {
			title: "Evento não encontrado | Academia Santanense de Letras, Ciências e Artes",
			description: "O evento solicitado não foi encontrado ou não está mais disponível.",
		};
	}

	if (!event) {
		return {
			title: "Evento não encontrado | Academia Santanense de Letras, Ciências e Artes",
			description: "O evento solicitado não foi encontrado ou não está mais disponível.",
		};
	}

	// Obter a base URL
	const parentMetadata = await parent;
	const previousImages = parentMetadata?.openGraph?.images || [];

	let imageUrl = "https://aslca.org.br/api/media/placeholder.png";
	if (event.image && typeof event.image !== "number" && event.image.url) {
		imageUrl = event.image.url;
	}

	return {
		title: `${event.title} | Evento | Academia Santanense de Letras, Ciências e Artes`,
		description: event.description || `Evento ${event.title} em ${event.location} no dia ${event.date}`,
		openGraph: {
			title: `${event.title} | Evento`,
			description: event.description || `Evento ${event.title} em ${event.location} no dia ${event.date}`,
			url: `https://aslca.org.br/eventos/${event.id}`,
			siteName: "Academia Santanense de Letras, Ciências e Artes",
			images: [imageUrl, ...previousImages],
			locale: "pt_BR",
		},
		twitter: {
			card: "summary_large_image",
			title: `${event.title} | Evento`,
			description: event.description || `Evento ${event.title} em ${event.location} no dia ${event.date}`,
			images: [imageUrl],
		},
	};
}
