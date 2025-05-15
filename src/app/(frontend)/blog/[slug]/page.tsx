import Image from "next/image";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import payloadConfig from "@/payload.config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { IconCalendar } from "@tabler/icons-react";

import { ShareButton } from "./_components/share-button";

export { generateMetadata } from "./metadata";

export const revalidate = 3600; // 1 hora

export async function generateStaticParams() {
	const payload = await getPayload({ config: payloadConfig });

	const { docs: posts } = await payload.find({
		collection: "blog-posts",
		where: {
			_status: {
				equals: "published",
			},
		},
		limit: 100,
	});

	return posts.map(post => ({
		slug: post.slug,
	}));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const payload = await getPayload({ config: payloadConfig });
	const { slug } = await params;

	const { docs: posts } = await payload.find({
		collection: "blog-posts",
		where: {
			slug: {
				equals: slug,
			},
			_status: {
				equals: "published",
			},
		},
		depth: 2,
		limit: 1,
	});

	const post = posts[0];
	if (!post) notFound();

	const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://aslca.org.br"}/blog/${post.slug}`;

	const publishedDate = Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(new Date(post.createdAt));

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">{post.title}</h1>
						<div className="mx-auto flex items-center justify-center space-x-4 text-white">
							<div className="flex items-center">
								<IconCalendar
									size={18}
									className="mr-1"
								/>
								<span>{publishedDate}</span>
							</div>
						</div>
					</div>
				</section>

				<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
						<div className="text-gray-600">
							{post.description && <p className="text-lg italic">{post.description}</p>}
						</div>

						<ShareButton
							title={post.title}
							url={fullUrl}
						/>
					</div>

					{post.url && (
						<div className="mb-8 overflow-hidden rounded-lg">
							<Image
								src={post.sizes?.large?.url || post.url}
								alt={post.title}
								width={post.sizes?.large?.width || 612}
								height={post.sizes?.large?.height || 350}
								className="h-auto w-full object-cover"
								priority
							/>
						</div>
					)}

					<div className="prose max-w-none">
						<RichText data={post.content} />
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
