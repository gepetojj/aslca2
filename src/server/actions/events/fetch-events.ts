"use server";

import { Where, getPayload } from "payload";

import { Event } from "@/payload-types";
import payloadConfig from "@/payload.config";

interface FetchEventsParams {
	search?: string;
	page: number;
	perPage: number;
	dateFilter?: {
		date: string;
		type: "before" | "after";
	};
}

interface FetchEventsResult {
	events: Event[];
	totalPages: number;
	currentPage: number;
	hasMore: boolean;
}

export async function fetchEvents({
	search,
	page = 1,
	perPage = 9,
	dateFilter,
}: FetchEventsParams): Promise<FetchEventsResult> {
	const payload = await getPayload({ config: payloadConfig });

	const whereCondition: Where = {};

	// Adiciona filtro de data se fornecido
	if (dateFilter && dateFilter.date) {
		whereCondition.date = {
			[dateFilter.type === "before" ? "less_than" : "greater_than"]: dateFilter.date,
		};
	}

	if (!search) {
		// Sem busca, exibe os eventos normalmente em ordem crescente por data
		const eventsResults = await payload.find({
			collection: "events",
			sort: "date", // Ordena por data do evento (crescente - mais próximos primeiro)
			page,
			limit: perPage,
			depth: 1,
			where: whereCondition,
		});

		return {
			events: eventsResults.docs as Event[],
			totalPages: eventsResults.totalPages,
			currentPage: page,
			hasMore: page < eventsResults.totalPages,
		};
	} else {
		// Com busca, filtra os eventos pela query de busca
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
							equals: "events",
						},
					},
				],
			},
		});

		const eventsItems = await Promise.all(
			searchResults.docs
				.filter(item => item.doc.relationTo === "events")
				.map(async item => {
					const event = await payload.findByID({
						collection: "events",
						id: item.doc.value as number,
					});
					return event;
				}),
		);

		return {
			events: eventsItems as Event[],
			totalPages: searchResults.totalPages,
			currentPage: page,
			hasMore: page < searchResults.totalPages,
		};
	}
}
