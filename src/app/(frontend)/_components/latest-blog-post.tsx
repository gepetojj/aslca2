import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

import payloadConfig from "@/payload.config";
import { IconArrowRight } from "@tabler/icons-react";

export async function LatestBlogPost() {
	const payload = await getPayload({ config: payloadConfig });

	const latest = await payload.find({
		collection: "blog-posts",
		sort: "-createdAt",
		page: 1,
		limit: 1,
		depth: 1,
		pagination: false,
	});

	const post = latest.docs[0];
	if (!post) return null;

	return (
		<div>
			<div className="mb-6 flex items-center">
				<h3 className="font-serif text-2xl font-bold text-gray-800">Última postagem do blog</h3>
				<div className="ml-4 h-px flex-grow bg-gray-300"></div>
			</div>

			<div className="overflow-hidden rounded-lg bg-white shadow-md">
				<div className="flex">
					<div className="w-1/3">
						<Image
							src={post.sizes?.small?.url || ""}
							width={post.sizes?.small?.width || 300}
							height={post.sizes?.small?.height || 150}
							alt="Postagem em destaque"
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="w-2/3 p-6">
						<h4 className="mb-2 text-xl font-bold text-gray-800">{post.title}</h4>
						<p className="mb-4 text-gray-600">
							{post.description.length > 100 ? `${post.description.slice(0, 100)}...` : post.description}
						</p>
						<Link
							href={`/blog/${post.slug}`}
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
