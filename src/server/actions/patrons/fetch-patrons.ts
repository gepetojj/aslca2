"use server";

import { getPayload } from "payload";

import { Patron } from "@/payload-types";
import payloadConfig from "@/payload.config";

interface FetchPatronsParams {
	search?: string;
	page: number;
	perPage: number;
}

interface FetchPatronsResult {
	patrons: Patron[];
	totalPages: number;
	currentPage: number;
	hasMore: boolean;
}

export async function fetchPatrons({
	search,
	page = 1,
	perPage = 20,
}: FetchPatronsParams): Promise<FetchPatronsResult> {
	const payload = await getPayload({ config: payloadConfig });

	// Para patronos, vamos ordená-los por número da cadeira
	const results = await payload.find({
		collection: "patrons",
		sort: "chair",
		page,
		limit: perPage,
		depth: 1,
	});

	// Filtrar localmente por busca, se fornecida
	let filteredPatrons = results.docs as Patron[];

	if (search) {
		const searchLower = search.toLowerCase();
		filteredPatrons = filteredPatrons.filter(patron => {
			// Busca por nome ou número da cadeira
			return (
				patron.name.toLowerCase().includes(searchLower) ||
				`cadeira ${patron.chair}`.toLowerCase().includes(searchLower)
			);
		});
	}

	return {
		patrons: filteredPatrons,
		totalPages: results.totalPages,
		currentPage: page,
		hasMore: page < results.totalPages,
	};
}
