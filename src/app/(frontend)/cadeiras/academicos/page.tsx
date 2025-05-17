import { Suspense } from "react";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { fetchAcademics } from "@/server/actions/academics/fetch-academics";

import { AcademicsGrid } from "./_components/academics-grid";

export const revalidate = 300; // 5 minutos

export interface AcademicsSearchParams {
	search?: string;
}

async function getInitialAcademics({ search }: AcademicsSearchParams) {
	const result = await fetchAcademics({
		search,
		page: 1,
		perPage: 500,
	});

	return {
		academics: result.academics,
	};
}

export default async function Page({ searchParams }: { searchParams: Promise<AcademicsSearchParams> }) {
	const { search } = await searchParams;
	const { academics: initialAcademics } = await getInitialAcademics({ search });

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Acadêmicos</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							Conheça os membros da Academia Santanense de Letras, Ciências e Artes
						</p>
					</div>
				</section>

				<section className="py-16">
					<div className="container mx-auto px-4">
						<Suspense
							fallback={
								<div className="flex justify-center py-20">
									<div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-800 border-t-transparent"></div>
								</div>
							}
						>
							<AcademicsGrid
								initialAcademics={initialAcademics}
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
