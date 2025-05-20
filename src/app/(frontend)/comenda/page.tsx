import { Suspense } from "react";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { fetchCommendations } from "@/server/actions/commendations/fetch-commendations";

import { CommendationsGrid } from "./_components/commendations-grid";

export const revalidate = 300; // 5 minutos

export interface CommendationsSearchParams {
	type?: "civil" | "literary" | "artistic" | "scientific";
	page?: string;
}

async function getInitialCommendations({ type, page }: CommendationsSearchParams) {
	const result = await fetchCommendations({
		type,
		page: page ? parseInt(page) : 1,
		perPage: 9,
	});

	return {
		commendations: result.commendations,
		totalPages: result.totalPages,
	};
}

export default async function Page({ searchParams }: { searchParams: Promise<CommendationsSearchParams> }) {
	const { type, page } = await searchParams;
	const { commendations: initialCommendations, totalPages } = await getInitialCommendations({
		type,
		page,
	});

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
							Comenda Breno Accioly
						</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							Reconhecimento da Academia Santanense de Letras, Ciências e Artes a cidadãos que se destacam
							em suas áreas de atuação
						</p>
					</div>
				</section>

				<section className="py-16">
					<div className="px-4">
						<h2 className="mb-8 text-center font-serif text-3xl font-bold text-gray-800">Homenageados</h2>

						<Suspense
							fallback={
								<div className="flex justify-center py-20">
									<div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-800 border-t-transparent"></div>
								</div>
							}
						>
							<CommendationsGrid
								initialCommendations={initialCommendations}
								initialTotalPages={totalPages}
								type={type}
							/>
						</Suspense>

						<div className="mt-24 mb-8 rounded-lg p-8">
							<h2 className="mb-4 text-center font-serif text-3xl font-bold text-amber-800">
								Sobre a Comenda Breno Accioly
							</h2>

							<div className="prose !max-w-full text-justify">
								<p>
									A Comenda Breno Accioly é a mais alta honraria concedida pela Academia Santanense de
									Letras, Ciências e Artes (ASLCA) a personalidades que se destacam por contribuições
									significativas à sociedade de Santana do Ipanema e região.
								</p>
								<p>
									Instituída em homenagem ao ilustre escritor alagoano Breno Accioly, nascido em
									Santana do Ipanema, a comenda reconhece e celebra indivíduos que, por meio de seus
									trabalhos e ações, promovem o desenvolvimento cultural, artístico, científico e
									social da comunidade.
								</p>
								<h3>Categorias da Comenda</h3>
								<p>
									A Comenda Breno Accioly é concedida em quatro categorias distintas, reconhecendo
									contribuições em diferentes esferas da sociedade:
								</p>
								<ul>
									<li>
										<strong>Civil</strong>: Destinada a líderes comunitários, funcionários públicos,
										empresários e cidadãos que se destacam por suas contribuições ao desenvolvimento
										social e econômico da comunidade.
									</li>
									<li>
										<strong>Literário</strong>: Honra escritores, poetas, jornalistas e educadores
										que promovem o desenvolvimento da literatura e da educação.
									</li>
									<li>
										<strong>Artístico</strong>: Reconhece artistas visuais, músicos, atores,
										dançarinos e outros profissionais que enriquecem a cena cultural com seu talento
										e criatividade.
									</li>
									<li>
										<strong>Científico</strong>: Premia pesquisadores, médicos, engenheiros e outros
										profissionais que contribuem para o avanço científico e tecnológico.
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
