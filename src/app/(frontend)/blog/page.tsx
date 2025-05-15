import { Suspense } from "react";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { fetchBlogPosts } from "@/server/actions/blog/fetch-blog-posts";
import { IconSearch } from "@tabler/icons-react";

import { PostsGrid } from "./_components/posts-grid";

export const revalidate = 300; // 5 minutos

export interface BlogSearchParams {
	search?: string;
	page?: string;
}

async function getInitialBlogPosts({ search, page }: BlogSearchParams) {
	const result = await fetchBlogPosts({
		search,
		page: page ? parseInt(page) : 1,
		perPage: 9,
	});

	return {
		posts: result.posts,
		totalPages: result.totalPages,
	};
}

export default async function Page({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
	const { search, page } = await searchParams;
	const { posts: initialPosts, totalPages } = await getInitialBlogPosts({ search, page });

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Postagens do blog</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							Visualize produções culturais de Santana do Ipanema
						</p>
					</div>
				</section>

				<section className="py-16">
					<div className="container mx-auto px-4">
						<form
							action="/blog"
							method="GET"
							className="mb-12"
						>
							<div className="relative mx-auto max-w-2xl">
								<input
									type="text"
									name="search"
									defaultValue={search}
									placeholder="Procure postagens..."
									className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-700 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
								/>
								<button
									type="submit"
									className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-amber-800"
								>
									<IconSearch size={20} />
								</button>
							</div>
						</form>

						<Suspense
							fallback={
								<div className="flex justify-center py-20">
									<div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-800 border-t-transparent"></div>
								</div>
							}
						>
							<PostsGrid
								initialPosts={initialPosts}
								initialTotalPages={totalPages}
								search={search}
							/>
						</Suspense>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
