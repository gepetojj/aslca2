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

	// Buscar dados do acadêmico
	const payload = await getPayload({ config: payloadConfig });

	const academicQuery = await payload.find({
		collection: "academics",
		where: {
			id: {
				equals: id,
			},
		},
		depth: 2,
		limit: 1,
	});

	const academic = academicQuery.docs[0];

	if (!academic) {
		return {
			title: "Acadêmico não encontrado | Academia Santanense de Letras, Ciências e Artes",
			description: "O acadêmico solicitado não foi encontrado ou não está mais disponível.",
		};
	}

	// Determinar o tipo de acadêmico para exibição
	const academicTypeLabels = {
		active: "Efetivo",
		benemeritus: "Benemérito",
		honorary: "Honorário",
		correspondent: "Correspondente",
		inMemoriam: "In Memoriam",
	};

	const academicTypeLabel = academicTypeLabels[academic.type as keyof typeof academicTypeLabels] || "Efetivo";
	const chairInfo =
		academic.patron?.docs?.[0] && typeof academic.patron.docs[0] === "object"
			? `Cadeira Nº ${academic.patron.docs[0].chair}`
			: "";

	// Obter a base URL
	const parentMetadata = await parent;
	const previousImages = parentMetadata?.openGraph?.images || [];
	const imageUrl = typeof academic.image !== "number" ? academic.image?.url : undefined;

	return {
		title: `${academic.name} | ${chairInfo ? `${chairInfo} | ` : ""}Academia Santanense de Letras, Ciências e Artes`,
		description: `Conheça ${academic.name}, acadêmico ${academicTypeLabel.toLowerCase()}${
			chairInfo ? ` da ${chairInfo}` : ""
		} da Academia Santanense de Letras, Ciências e Artes.`,
		openGraph: {
			title: `${academic.name} | Acadêmico ${academicTypeLabel}${chairInfo ? ` | ${chairInfo}` : ""}`,
			description: `Conheça ${academic.name}, acadêmico ${academicTypeLabel.toLowerCase()}${
				chairInfo ? ` da ${chairInfo}` : ""
			} da Academia Santanense de Letras, Ciências e Artes.`,
			images: imageUrl ? [imageUrl, ...previousImages] : [...previousImages],
			type: "profile",
		},
		twitter: {
			card: "summary_large_image",
			title: `${academic.name} | Acadêmico ${academicTypeLabel}${chairInfo ? ` | ${chairInfo}` : ""}`,
			description: `Conheça ${academic.name}, acadêmico ${academicTypeLabel.toLowerCase()}${
				chairInfo ? ` da ${chairInfo}` : ""
			} da Academia Santanense de Letras, Ciências e Artes.`,
			images: imageUrl ? [imageUrl, ...previousImages] : [...previousImages],
		},
	};
}
