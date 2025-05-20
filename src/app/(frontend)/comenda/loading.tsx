import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export default function Loading() {
	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<div className="mx-auto mb-4 h-12 w-3/4 animate-pulse rounded-lg bg-white/30 md:w-2/4"></div>
						<div className="mx-auto h-6 w-2/4 animate-pulse rounded-lg bg-white/30 md:w-1/4"></div>
					</div>
				</section>

				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="mx-auto mb-12 max-w-4xl animate-pulse space-y-4 rounded-lg bg-white/80 p-8 shadow-md">
							<div className="mx-auto h-8 w-3/4 rounded-lg bg-gray-200"></div>
							<div className="h-4 w-full rounded-lg bg-gray-200"></div>
							<div className="h-4 w-5/6 rounded-lg bg-gray-200"></div>
							<div className="h-4 w-full rounded-lg bg-gray-200"></div>
							<div className="h-4 w-4/5 rounded-lg bg-gray-200"></div>
							<div className="h-6 w-1/2 rounded-lg bg-gray-200"></div>
							<div className="h-4 w-full rounded-lg bg-gray-200"></div>
							<div className="h-4 w-5/6 rounded-lg bg-gray-200"></div>
							<div className="h-4 w-full rounded-lg bg-gray-200"></div>
							<div className="h-4 w-3/4 rounded-lg bg-gray-200"></div>
						</div>

						<div className="mb-12">
							<div className="relative mx-auto max-w-2xl">
								<div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
							</div>
						</div>

						<div className="mb-8 animate-pulse rounded-lg bg-gray-200 py-4 text-center">
							<div className="mx-auto h-8 w-64 rounded-lg bg-white/30"></div>
						</div>

						<div className="flex justify-center py-20">
							<div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-800 border-t-transparent"></div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
