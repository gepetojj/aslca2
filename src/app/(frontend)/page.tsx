import Link from "next/link";
import { getPayload } from "payload";

import { Footer } from "@/components/ui/footer";
import { Gallery } from "@/components/ui/gallery";
import { Header } from "@/components/ui/header";
import { Media } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { LatestBlogPost } from "./_components/latest-blog-post";
import { LatestNews } from "./_components/latest-news";

export const revalidate = 300; // 5 minutos

export default async function HomePage() {
	const payload = await getPayload({ config: payloadConfig });

	const [citation, gallery, events] = await Promise.all([
		payload.findGlobal({
			slug: "citation",
		}),
		payload.findGlobal({
			slug: "gallery",
			depth: 1,
		}),
		payload.find({
			collection: "events",
			limit: 3,
			sort: "-date",
			where: {
				date: {
					greater_than_equal: new Date().toISOString(),
				},
			},
		}),
	]);
	const images = (gallery?.images as Media[]) || [];

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<section className="relative h-96 overflow-hidden bg-gray-200">
				<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
				<div className="relative z-20 container mx-auto flex h-full items-center px-4">
					<div className="max-w-2xl text-white">
						<h2 className="mb-4 font-serif text-4xl font-bold md:text-5xl">
							Academia Santanense de Letras, Ciências e Artes
						</h2>
						<p className="mb-6 text-lg">
							Preservando a cultura e promovendo o conhecimento em Santana do Ipanema.
						</p>
						<div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
							<Link
								href="/sobre/historia"
								className="cursor-pointer rounded-md bg-white px-6 py-3 font-medium text-amber-900 transition-colors hover:bg-gray-100"
							>
								Conheça nossa história
							</Link>
							<Link
								href="/eventos"
								className="cursor-pointer rounded-md border border-white px-6 py-3 text-center font-medium text-white transition-colors hover:bg-white/10"
							>
								Eventos
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Quote Section */}
			<section className="bg-amber-50 py-16">
				<div className="container mx-auto px-4">
					<div className="grid items-center gap-12 md:grid-cols-2">
						<div className="max-w-2xl">
							<svg
								className="mb-6 h-12 w-12 text-amber-800"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
							</svg>
							<blockquote className="font-serif text-xl text-gray-800 italic md:text-2xl">
								<RichText data={citation.text} />
							</blockquote>
							<p className="mt-6 font-medium text-amber-800">{citation.author}</p>
						</div>

						<div>
							<Gallery
								images={images.map(img => ({
									src: img.url || "",
									alt: img.alt,
									width: 1200,
									height: 675,
								}))}
								autoRotateInterval={6000}
								aspectRatio="16/9"
								maxHeight="400px"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid items-start gap-12 md:grid-cols-2">
						<LatestNews />
						<LatestBlogPost />
					</div>
				</div>
			</section>

			{/* Featured Academicians */}
			{/* <section className="bg-amber-50 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h3 className="mb-4 font-serif text-3xl font-bold text-gray-800">Membros em Destaque</h3>
						<p className="mx-auto max-w-3xl text-gray-600">
							Conheça alguns dos nossos ilustres membros que contribuem para o enriquecimento cultural e
							científico de Santana do Ipanema.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{[1, 2, 3].map(item => (
							<div
								key={item}
								className="rounded-lg bg-white p-6 text-center shadow-md"
							>
								<div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
									<img
										src="/api/placeholder/96/96"
										alt="Membro"
										className="h-full w-full object-cover"
									/>
								</div>
								<h4 className="mb-1 text-xl font-bold text-gray-800">Nome do Membro</h4>
								<p className="mb-4 text-amber-800">Cadeira Nº {item}</p>
								<p className="mb-4 text-gray-600">
									Breve biografia do membro destacando suas contribuições para a academia e para a
									sociedade.
								</p>
								<a
									href="#"
									className="font-medium text-amber-800 hover:text-amber-900"
								>
									Ver perfil completo
								</a>
							</div>
						))}
					</div>

					<div className="mt-10 text-center">
						<a
							href="#"
							className="inline-block rounded-md border border-amber-800 px-6 py-3 font-medium text-amber-800 transition-colors hover:bg-amber-800 hover:text-white"
						>
							Ver todos os membros
						</a>
					</div>
				</div>
			</section> */}

			{/* Events */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="mb-10 flex items-center justify-between">
						<h3 className="font-serif text-3xl font-bold text-gray-800">Próximos Eventos</h3>
						<Link
							href="/eventos"
							className="flex items-center font-medium text-amber-800 hover:text-amber-900"
						>
							Ver calendário completo
							<svg
								className="ml-2 h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								></path>
							</svg>
						</Link>
					</div>

					{events.docs.length > 0 ? (
						<div className="grid gap-8 md:grid-cols-3">
							{events.docs.map((event, index) => (
								<div
									key={index}
									className="overflow-hidden rounded-lg bg-white shadow-md"
								>
									<div className="bg-amber-800 p-3 text-center text-white">
										<p className="text-lg font-bold">
											{new Date(event.date).toLocaleString("pt-BR", {
												day: "2-digit",
												month: "long",
												year:
													new Date(event.date).getFullYear() > new Date().getFullYear()
														? "numeric"
														: undefined,
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
									</div>
									<div className="p-6">
										<h4 className="mb-2 text-xl font-bold text-gray-800">{event.title}</h4>
										<div className="mb-4 flex items-start">
											<svg
												className="mt-0.5 mr-2 h-5 w-5 text-amber-800"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
												></path>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
												></path>
											</svg>
											<p className="text-gray-600">{event.location}</p>
										</div>
										<Link
											href={`/eventos/${event.id}`}
											className="flex items-center font-medium text-amber-800 hover:text-amber-900"
										>
											Saiba mais
											<svg
												className="ml-2 h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M14 5l7 7m0 0l-7 7m7-7H3"
												></path>
											</svg>
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="rounded-lg bg-white p-10 text-center">
							<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
								<svg
									className="h-10 w-10 text-amber-800"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
							</div>
							<h4 className="mb-2 font-serif text-xl font-bold text-gray-800">
								Nenhum evento programado
							</h4>
							<p className="mb-6 text-gray-600">
								Não há eventos próximos agendados no momento. Por favor, verifique novamente em breve.
							</p>
							<Link
								href="/eventos"
								className="inline-block rounded-md border border-amber-800 px-6 py-3 font-medium text-amber-800 transition-colors hover:bg-amber-800 hover:text-white"
							>
								Ver eventos passados
							</Link>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</div>
	);
}
