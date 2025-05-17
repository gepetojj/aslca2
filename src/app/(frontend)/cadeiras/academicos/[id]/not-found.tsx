import Link from "next/link";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { IconUser } from "@tabler/icons-react";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
							Acadêmico não encontrado
						</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							O acadêmico que você está procurando não foi encontrado ou não está mais disponível.
						</p>
					</div>
				</section>

				<div className="container mx-auto my-16 px-4 text-center">
					<div className="rounded-lg p-10">
						<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
							<IconUser className="h-10 w-10 text-amber-800" />
						</div>
						<h2 className="mb-4 text-2xl font-bold">Acadêmico não encontrado</h2>
						<p className="mb-8 text-gray-600">
							O acadêmico que você está procurando pode ter sido removido, ou o identificador informado
							não existe.
						</p>
						<Link
							href="/cadeiras/academicos"
							className="inline-block rounded-md bg-amber-600 px-6 py-3 font-medium text-white transition hover:bg-amber-700"
						>
							Ver todos os acadêmicos
						</Link>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
