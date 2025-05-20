"use server";

import { getPayload } from "payload";

import { Commendation, Search } from "@/payload-types";
import payloadConfig from "@/payload.config";

interface FetchCommendationsParams {
	search?: string;
	type?: "civil" | "literary" | "artistic" | "scientific";
	page: number;
	perPage: number;
}

interface FetchCommendationsResult {
	commendations: Commendation[];
	totalPages: number;
	currentPage: number;
	hasMore: boolean;
}

export async function fetchCommendations({
	search,
	type,
	page = 1,
	perPage = 9,
}: FetchCommendationsParams): Promise<FetchCommendationsResult> {
	const payload = await getPayload({ config: payloadConfig });

	if (!search) {
		// Busca normal, ordenada por nome
		const commendationsResults = await payload.find({
			collection: "commendations",
			sort: "name",
			page,
			limit: perPage,
			depth: 1,
			where: type
				? {
						type: {
							equals: type,
						},
					}
				: undefined,
		});

		return {
			commendations: commendationsResults.docs as Commendation[],
			totalPages: commendationsResults.totalPages,
			currentPage: page,
			hasMore: page < commendationsResults.totalPages,
		};
	} else {
		// Busca com filtro de texto
		const searchResults = await payload.find({
			collection: "search",
			page,
			limit: perPage,
			depth: 2,
			where: {
				and: [
					{
						title: {
							like: search,
						},
					},
					{
						"doc.relationTo": {
							equals: "commendations",
						},
					},
				],
			},
		});

		const commendationItems = await Promise.all(
			searchResults.docs
				.filter((item: Search) => item.doc.relationTo === "commendations")
				.map(async (item: Search) => {
					const commendation = await payload.findByID({
						collection: "commendations",
						id: item.doc.value as number,
					});
					return commendation;
				}),
		);

		const filteredCommendations = type
			? commendationItems.filter((item: Commendation) => item.type === type)
			: commendationItems;

		return {
			commendations: filteredCommendations as Commendation[],
			totalPages: searchResults.totalPages,
			currentPage: page,
			hasMore: page < searchResults.totalPages,
		};
	}
}
