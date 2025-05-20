import Image from "next/image";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { ShareButton } from "@/components/ui/share-button";
import payloadConfig from "@/payload.config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { IconAward } from "@tabler/icons-react";

export { generateMetadata } from "./metadata";

export const revalidate = 3600; // 1 hora

export async function generateStaticParams() {
	const payload = await getPayload({ config: payloadConfig });

	const { docs: commendations } = await payload.find({
		collection: "commendations",
		limit: 100,
	});

	return commendations.map(commendation => ({
		id: String(commendation.id),
	}));
}

export default async function Page({ params }: { params: { id: string } }) {
	const payload = await getPayload({ config: payloadConfig });
	const { id } = params;

	let commendation;
	try {
		commendation = await payload.findByID({
			collection: "commendations",
			id: parseInt(id),
			depth: 1,
		});
	} catch (error) {
		console.error("Erro ao buscar comenda:", error);
		notFound();
	}

	if (!commendation) notFound();

	const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://aslca.org.br"}/comenda/${id}`;

	const typeLabel =
		commendation.type === "civil"
			? "Civil"
			: commendation.type === "literary"
				? "Literário"
				: commendation.type === "artistic"
					? "Artístico"
					: "Científico";

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
							{commendation.name}
						</h1>
						<div className="mx-auto flex items-center justify-center space-x-4 text-white">
							<div className="flex items-center">
								<IconAward
									size={20}
									className="mr-2"
								/>
								<span>Comenda Breno Accioly - {typeLabel}</span>
							</div>
						</div>
					</div>
				</section>

				<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="mb-8 flex flex-col gap-8 md:flex-row">
						<div className="w-full flex-shrink-0 md:w-1/3">
							<div className="flex flex-col gap-3 overflow-hidden rounded-lg p-2">
								{commendation.image && typeof commendation.image !== "number" && (
									<>
										<div className="relative h-80 w-full overflow-hidden">
											<Image
												src={commendation.image.url || ""}
												alt={commendation.name}
												fill
												className="object-cover"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
										</div>
									</>
								)}
							</div>
							<div className="mt-4 flex flex-col gap-4">
								<div className="px-1 text-left">
									<h3 className="text-sm text-gray-500">Categoria</h3>
									<p className="font-medium text-gray-900">{typeLabel}</p>
								</div>
								<ShareButton
									title={`Comenda Breno Accioly - ${commendation.name}`}
									url={fullUrl}
								/>
							</div>
						</div>

						<div className="flex-grow">
							<div className="prose max-w-none">
								<RichText data={commendation.biography} />
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
