import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { ShareButton } from "@/components/ui/share-button";
import payloadConfig from "@/payload.config";
import { Divider } from "@mantine/core";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { IconUser } from "@tabler/icons-react";

export const revalidate = 3600; // 1 hora

export default async function Page({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
	const payload = await getPayload({ config: payloadConfig });
	const { id } = await params;

	const academicQuery = await payload.find({
		collection: "academics",
		where: {
			id: {
				equals: id,
			},
		},
		depth: 2,
		limit: 1,
	});

	const academic = academicQuery.docs[0];
	if (!academic) notFound();

	const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://aslca.org.br"}/cadeiras/academicos/${academic.id}`;

	// Determinar o tipo de acadêmico para exibição
	const academicTypeLabels = {
		active: "Efetivo",
		benemeritus: "Benemérito",
		honorary: "Honorário",
		correspondent: "Correspondente",
		inMemoriam: "In Memoriam",
	};

	const academicTypeLabel = academicTypeLabels[academic.type as keyof typeof academicTypeLabels] || "Efetivo";

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">{academic.name}</h1>
						<div className="mx-auto flex items-center justify-center space-x-4 text-white">
							<div className="flex items-center">
								<IconUser
									size={18}
									className="mr-1"
								/>
								<span>Acadêmico {academicTypeLabel}</span>
							</div>
							{academic.patron?.docs?.[0] && typeof academic.patron.docs[0] === "object" && (
								<div className="flex items-center">
									<span>Cadeira Nº {academic.patron.docs[0].chair}</span>
								</div>
							)}
						</div>
					</div>
				</section>

				<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="mb-8 flex flex-col items-start gap-8 md:flex-row">
						<div className="w-full flex-shrink-0 md:w-1/3">
							<div className="flex flex-col gap-3 overflow-hidden rounded-lg bg-white p-2 shadow-md">
								{academic.image && typeof academic.image !== "number" && (
									<>
										<Image
											src={academic.image.url || ""}
											alt={academic.name}
											width={academic.image.width || 300}
											height={academic.image.height || 300}
											className="aspect-square h-auto w-full object-cover"
											priority
										/>
										<div className="px-1 py-2">
											<Divider />
										</div>
									</>
								)}
								<div className="px-1 text-left">
									<h3 className="font-medium text-gray-900">{academic.name}</h3>
									<p className="text-sm text-gray-700">Acadêmico {academicTypeLabel}</p>
								</div>
								{academic.patron?.docs?.[0] && typeof academic.patron.docs[0] === "object" && (
									<div className="px-1 text-left">
										<h3 className="text-sm text-gray-500">Patrono</h3>
										<Link
											href={`/cadeiras/patronos/${academic.patron.docs[0].id}`}
											className="font-medium text-gray-900 hover:underline"
										>
											{academic.patron.docs[0].name}
										</Link>
										<p className="text-sm text-gray-700">
											Cadeira Nº {academic.patron.docs[0].chair}
										</p>
									</div>
								)}
								<ShareButton
									title={`Acadêmico ${academic.name} - ${academicTypeLabel}`}
									url={fullUrl}
								/>
							</div>
						</div>

						<div className="flex-grow">
							<div className="prose max-w-none">
								<RichText data={academic.biography} />
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
