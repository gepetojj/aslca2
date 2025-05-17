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

				<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="mb-8 flex flex-col items-start gap-8 md:flex-row">
						<div className="w-full flex-shrink-0 md:w-1/3">
							<div className="overflow-hidden rounded-lg bg-white p-2 shadow-md">
								<div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200"></div>
								<div className="mt-4 border-t border-gray-200 p-4 text-center">
									<div className="mx-auto h-4 w-1/2 animate-pulse rounded-lg bg-gray-200"></div>
									<div className="mx-auto mt-2 h-6 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
								</div>
							</div>
						</div>

						<div className="flex-grow">
							<div className="space-y-4">
								<div className="h-4 w-full animate-pulse rounded-lg bg-gray-200"></div>
								<div className="h-4 w-5/6 animate-pulse rounded-lg bg-gray-200"></div>
								<div className="h-4 w-full animate-pulse rounded-lg bg-gray-200"></div>
								<div className="h-4 w-4/6 animate-pulse rounded-lg bg-gray-200"></div>

								<div className="py-4"></div>

								<div className="h-4 w-full animate-pulse rounded-lg bg-gray-200"></div>
								<div className="h-4 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
								<div className="h-4 w-full animate-pulse rounded-lg bg-gray-200"></div>
								<div className="h-4 w-5/6 animate-pulse rounded-lg bg-gray-200"></div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
