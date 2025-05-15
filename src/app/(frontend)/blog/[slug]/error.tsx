"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Ocorreu um erro</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							Desculpe, ocorreu um erro ao carregar esta postagem.
						</p>
					</div>
				</section>

				<div className="container mx-auto my-16 px-4 text-center">
					<div className="rounded-lg p-10">
						<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
							<IconAlertTriangle className="h-10 w-10 text-red-500" />
						</div>
						<h2 className="mb-4 text-2xl font-bold">Erro ao carregar a postagem</h2>
						<p className="mb-8 text-gray-600">
							Ocorreu um problema ao tentar carregar esta postagem. Por favor, tente novamente ou volte
							para a página de postagens.
						</p>
						<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
							<button
								onClick={() => reset()}
								className="inline-block rounded-md bg-amber-600 px-6 py-3 font-medium text-white transition hover:bg-amber-700"
							>
								Tentar novamente
							</button>
							<Link
								href="/blog"
								className="inline-block rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
							>
								Voltar para postagens
							</Link>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
