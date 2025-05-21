import { Metadata, ResolvingMetadata } from "next";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";

interface Props {
	params: {
		id: string;
	};
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const id = params.id;

	// Buscar dados da comenda
	const payload = await getPayload({ config: payloadConfig });

	let commendation;
	try {
		commendation = await payload.findByID({
			collection: "commendations",
			id: parseInt(id),
			depth: 1,
		});
	} catch {
		return {
			title: "Comenda não encontrada | Academia Santanense de Letras, Ciências e Artes",
			description: "A comenda solicitada não foi encontrada ou não está mais disponível.",
		};
	}

	if (!commendation) {
		return {
			title: "Comenda não encontrada | Academia Santanense de Letras, Ciências e Artes",
			description: "A comenda solicitada não foi encontrada ou não está mais disponível.",
		};
	}

	// Obter a base URL
	const parentMetadata = await parent;
	const previousImages = parentMetadata?.openGraph?.images || [];

	// Obter tipo formatado da comenda
	const typeLabel =
		commendation.type === "civil"
			? "Civil"
			: commendation.type === "literary"
				? "Literário"
				: commendation.type === "artistic"
					? "Artístico"
					: "Científico";

	let imageUrl = "https://aslca.org.br/api/media/placeholder.png";
	if (commendation.image && typeof commendation.image !== "number" && commendation.image.url) {
		imageUrl = commendation.image.url;
	}

	// Gerar descrição
	const description = `${commendation.name} - Homenageado(a) com a Comenda Breno Accioly na categoria ${typeLabel} pela Academia Santanense de Letras, Ciências e Artes.`;

	return {
		title: `${commendation.name} | Comenda Breno Accioly`,
		description,
		openGraph: {
			title: `${commendation.name} | Comenda Breno Accioly`,
			description,
			images: [imageUrl, ...previousImages],
		},
		twitter: {
			card: "summary_large_image",
			title: `${commendation.name} | Comenda Breno Accioly`,
			description,
			images: [imageUrl],
		},
	};
}
