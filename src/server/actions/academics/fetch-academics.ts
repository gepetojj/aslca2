"use server";

import { getPayload } from "payload";

import { Academic, Patron } from "@/payload-types";
import payloadConfig from "@/payload.config";

interface FetchAcademicsParams {
	search?: string;
	page: number;
	perPage: number;
}

interface FetchAcademicsResult {
	academics: Academic[];
	totalPages: number;
	currentPage: number;
	hasMore: boolean;
}

export async function fetchAcademics({
	search,
	page = 1,
	perPage = 50,
}: FetchAcademicsParams): Promise<FetchAcademicsResult> {
	const payload = await getPayload({ config: payloadConfig });

	// Buscar acadêmicos e os ordenar pelo nome do patrono (cadeira)
	const results = await payload.find({
		collection: "academics",
		depth: 2, // Para acessar informações do patrono
		page,
		limit: perPage,
	});

	// Filtrar localmente por busca, se fornecida
	let filteredAcademics = results.docs as Academic[];

	// Ordenar pelo número da cadeira (quando existir patrono)
	filteredAcademics.sort((a, b) => {
		const patronA = (a.patron?.docs?.[0] as Patron) || undefined;
		const patronB = (b.patron?.docs?.[0] as Patron) || undefined;

		// Se ambos têm patrono, ordenar pelo número da cadeira
		if (patronA && patronB) {
			return patronA.chair - patronB.chair;
		}

		// Se apenas um tem patrono, ele vem primeiro
		if (patronA) return -1;
		if (patronB) return 1;

		// Se nenhum tem patrono, ordena pelo nome
		return a.name.localeCompare(b.name);
	});

	if (search) {
		const searchLower = search.toLowerCase();
		filteredAcademics = filteredAcademics.filter(academic => {
			// Busca por nome do acadêmico
			if (academic.name.toLowerCase().includes(searchLower)) {
				return true;
			}

			// Busca pelo número da cadeira (via patrono)
			if (
				academic.patron?.docs?.[0] &&
				typeof academic.patron.docs[0] === "object" &&
				`cadeira ${(academic?.patron?.docs?.[0]).chair}`.toLowerCase().includes(searchLower)
			) {
				return true;
			}

			return false;
		});
	}

	return {
		academics: filteredAcademics,
		totalPages: results.totalPages,
		currentPage: page,
		hasMore: page < results.totalPages,
	};
}
