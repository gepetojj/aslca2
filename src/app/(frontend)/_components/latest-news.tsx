import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";
import { IconArrowRight } from "@tabler/icons-react";

export async function LatestNews() {
	const payload = await getPayload({ config: payloadConfig });

	const latest = await payload.find({
		collection: "news",
		sort: "-createdAt",
		page: 1,
		limit: 1,
		depth: 1,
		pagination: false,
	});

	const news = latest.docs[0];
	if (!news) return null;

	return (
		<div>
			<div className="mb-6 flex items-center">
				<h3 className="font-serif text-2xl font-bold text-gray-800">Última notícia</h3>
				<div className="ml-4 h-px flex-grow bg-gray-300"></div>
			</div>

			<div className="overflow-hidden rounded-lg bg-white shadow-md">
				<div className="flex">
					<div className="w-1/3">
						<Image
							src={news.sizes?.small?.url || ""}
							width={news.sizes?.small?.width || 300}
							height={news.sizes?.small?.height || 150}
							alt="Notícia em destaque"
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="w-2/3 p-6">
						<h4 className="mb-2 text-xl font-bold text-gray-800">{news.title}</h4>
						<p className="mb-4 text-gray-600">
							{news.description.length > 100 ? `${news.description.slice(0, 100)}...` : news.description}
						</p>
						<Link
							href={`/noticias/${news.slug}`}
							className="flex items-center font-medium text-amber-800 hover:text-amber-900"
						>
							Leia mais
							<IconArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
