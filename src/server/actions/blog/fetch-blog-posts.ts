"use server";

import { getPayload } from "payload";

import { BlogPost, Search } from "@/payload-types";
import payloadConfig from "@/payload.config";

interface FetchBlogPostsParams {
	search?: string;
	page: number;
	perPage: number;
}

interface FetchBlogPostsResult {
	posts: BlogPost[];
	totalPages: number;
	currentPage: number;
	hasMore: boolean;
}

export async function fetchBlogPosts({
	search,
	page = 1,
	perPage = 9,
}: FetchBlogPostsParams): Promise<FetchBlogPostsResult> {
	const payload = await getPayload({ config: payloadConfig });

	if (!search) {
		const results = await payload.find({
			collection: "blog-posts",
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
			posts: results.docs as BlogPost[],
			totalPages: results.totalPages,
			currentPage: page,
			hasMore: page < results.totalPages,
		};
	} else {
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
							equals: "blog-posts",
						},
					},
				],
			},
		});

		const items = await Promise.all(
			searchResults.docs
				.filter((item: Search) => item.doc.relationTo === "blog-posts")
				.map(async (item: Search) => {
					const news = await payload.findByID({
						collection: "blog-posts",
						id: item.doc.value as number,
					});
					return news;
				}),
		);

		return {
			posts: items as BlogPost[],
			totalPages: searchResults.totalPages,
			currentPage: page,
			hasMore: page < searchResults.totalPages,
		};
	}
}
