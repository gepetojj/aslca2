import { Suspense } from "react";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { fetchEvents } from "@/server/actions/events/fetch-events";
import { IconCalendar } from "@tabler/icons-react";

import { EventsGrid } from "./_components/events-grid";

export const revalidate = 300; // 5 minutos

export interface EventsSearchParams {
	search?: string;
	page?: string;
}

async function getInitialEvents({ search, page }: EventsSearchParams) {
	const result = await fetchEvents({
		search,
		page: page ? parseInt(page) : 1,
		perPage: 9,
	});

	return {
		events: result.events,
		totalPages: result.totalPages,
	};
}

export default async function Page({ searchParams }: { searchParams: Promise<EventsSearchParams> }) {
	const { search, page } = await searchParams;
	const { events: initialEvents, totalPages } = await getInitialEvents({ search, page });

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Eventos</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							Acompanhe os principais eventos promovidos pela Academia Santanense de Letras, Ciências e
							Artes
						</p>
					</div>
				</section>

				<section className="container mx-auto my-12 px-4">
					<div className="mb-12">
						<form
							action="/eventos"
							method="GET"
							className="mx-auto flex max-w-2xl"
						>
							<input
								type="text"
								name="search"
								defaultValue={search}
								placeholder="Buscar eventos..."
								className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-3 focus:border-amber-800 focus:outline-none"
							/>
							<button
								type="submit"
								className="rounded-r-md bg-amber-800 px-8 text-white hover:bg-amber-900"
							>
								Buscar
							</button>
						</form>
					</div>

					<Suspense
						fallback={
							<div className="my-16 text-center">
								<IconCalendar className="mx-auto mb-4 h-12 w-12 animate-pulse text-amber-800" />
								<p className="text-lg text-gray-600">Carregando eventos...</p>
							</div>
						}
					>
						<EventsGrid
							initialEvents={initialEvents}
							initialTotalPages={totalPages}
							search={search}
						/>
					</Suspense>
				</section>
			</main>

			<Footer />
		</div>
	);
}
