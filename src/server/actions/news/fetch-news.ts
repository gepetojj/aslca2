"use server";

import { getPayload } from "payload";

import { News, Search } from "@/payload-types";
import payloadConfig from "@/payload.config";

interface FetchNewsParams {
	search?: string;
	page: number;
	perPage: number;
}

interface FetchNewsResult {
	news: News[];
	totalPages: number;
	currentPage: number;
	hasMore: boolean;
}

export async function fetchNews({ search, page = 1, perPage = 9 }: FetchNewsParams): Promise<FetchNewsResult> {
	const payload = await getPayload({ config: payloadConfig });

	if (!search) {
		// Sem busca, exibe as notícias normalmente em ordem decrescente
		const newsResults = await payload.find({
			collection: "news",
			sort: "-createdAt",
			page,
			limit: perPage,
			depth: 1,
			where: {
				_status: {
					equals: "published",
				},
			},
		});

		return {
			news: newsResults.docs as News[],
			totalPages: newsResults.totalPages,
			currentPage: page,
			hasMore: page < newsResults.totalPages,
		};
	} else {
		// Com busca, filtra as notícias pela query de busca
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
							equals: "news",
						},
					},
				],
			},
		});

		const newsItems = await Promise.all(
			searchResults.docs
				.filter((item: Search) => item.doc.relationTo === "news")
				.map(async (item: Search) => {
					const news = await payload.findByID({
						collection: "news",
						id: item.doc.value as number,
					});
					return news;
				}),
		);

		return {
			news: newsItems as News[],
			totalPages: searchResults.totalPages,
			currentPage: page,
			hasMore: page < searchResults.totalPages,
		};
	}
}
