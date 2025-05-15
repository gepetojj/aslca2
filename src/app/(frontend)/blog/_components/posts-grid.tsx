"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { BlogPost } from "@/payload-types";
import { fetchNews } from "@/server/actions/news/fetch-news";
import { IconArrowRight, IconLoader, IconSearch } from "@tabler/icons-react";

interface PostsGridProps {
	initialPosts: BlogPost[];
	initialTotalPages: number;
	search?: string;
}

export function PostsGrid({ initialPosts, initialTotalPages, search }: PostsGridProps) {
	const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(initialTotalPages > 1);

	const loadMoreNews = async () => {
		if (loading) return;

		setLoading(true);
		try {
			const nextPage = page + 1;
			const result = await fetchNews({
				search,
				page: nextPage,
				perPage: 9,
			});

			setPosts(prevNews => [...prevNews, ...result.news]);
			setPage(nextPage);
			setHasMore(result.hasMore);
		} catch (error) {
			console.error("Erro ao carregar mais notícias:", error);
		} finally {
			setLoading(false);
		}
	};

	if (initialPosts.length === 0) {
		return (
			<div className="my-16 rounded-lg bg-white p-10 text-center shadow-md">
				<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
					<IconSearch className="h-10 w-10 text-amber-800" />
				</div>
				<h4 className="mb-2 font-serif text-xl font-bold text-gray-800">Nenhuma postagem encontrada</h4>
				<p className="mb-6 text-gray-600">
					{search
						? "Não foram encontradas postagens que correspondam à sua pesquisa."
						: "Não existem postagens publicadas no momento."}
				</p>
				{search && (
					<Link
						href="/blog"
						className="inline-block rounded-md border border-amber-800 px-6 py-3 font-medium text-amber-800 transition-colors hover:bg-amber-800 hover:text-white"
					>
						Ver todas as postagens
					</Link>
				)}
			</div>
		);
	}

	return (
		<InfiniteScroll
			dataLength={posts.length}
			next={loadMoreNews}
			hasMore={hasMore}
			loader={
				<div className="my-8 flex justify-center">
					<div className="flex items-center gap-3">
						<IconLoader className="h-6 w-6 animate-spin text-amber-800" />
						<span className="text-amber-800">Carregando mais postagens...</span>
					</div>
				</div>
			}
			endMessage={
				posts.length >= 12 ? (
					<div className="my-8 text-center text-gray-600">
						<p>Você chegou ao final das postagens disponíveis.</p>
					</div>
				) : undefined
			}
		>
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((item: BlogPost, i) => (
					<div
						key={item.id}
						className="overflow-hidden rounded-lg bg-white shadow-md"
					>
						<div className="relative h-48 w-full bg-slate-400">
							<Image
								src={item.sizes?.small?.url || ""}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								alt={item.title}
								className="object-cover"
								priority={i < 3}
							/>
						</div>
						<div className="p-6">
							<h4 className="mb-2 text-xl font-bold text-gray-800">{item.title}</h4>
							<p className="mb-4 line-clamp-3 text-gray-600">{item.description}</p>
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-500">
									{new Date(item.createdAt).toLocaleDateString("pt-BR", {
										day: "2-digit",
										month: "long",
										year: "numeric",
									})}
								</span>
								<Link
									href={`/blog/${item.slug}`}
									className="flex items-center font-medium text-amber-800 hover:text-amber-900"
								>
									Ler mais
									<IconArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</InfiniteScroll>
	);
}
