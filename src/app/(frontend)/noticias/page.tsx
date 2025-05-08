import { Suspense } from "react";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { fetchNews } from "@/server/actions/news/fetch-news";
import { IconSearch } from "@tabler/icons-react";

import { NewsGrid } from "./_components/news-grid";

export const revalidate = 300; // 5 minutos

export interface NewsSearchParams {
	search?: string;
	page?: string;
}

async function getInitialNews({ search, page }: NewsSearchParams) {
	const result = await fetchNews({
		search,
		page: page ? parseInt(page) : 1,
		perPage: 9,
	});

	return {
		news: result.news,
		totalPages: result.totalPages,
	};
}

export default async function Page({ searchParams }: { searchParams: NewsSearchParams }) {
	const { news: initialNews, totalPages } = await getInitialNews(searchParams);

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Notícias</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							Acompanhe as principais novidades e acontecimentos da Academia Santanense de Letras,
							Ciências e Artes
						</p>
					</div>
				</section>

				<section className="py-16">
					<div className="container mx-auto px-4">
						<form
							action="/noticias"
							method="GET"
							className="mb-12"
						>
							<div className="relative mx-auto max-w-2xl">
								<input
									type="text"
									name="search"
									defaultValue={searchParams.search}
									placeholder="Procure notícias..."
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
							<NewsGrid
								initialNews={initialNews}
								initialTotalPages={totalPages}
								search={searchParams.search}
							/>
						</Suspense>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
