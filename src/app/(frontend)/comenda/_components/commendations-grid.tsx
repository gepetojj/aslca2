"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Commendation } from "@/payload-types";
import { fetchCommendations } from "@/server/actions/commendations/fetch-commendations";
import { IconArrowRight, IconLoader, IconMedal, IconSearch } from "@tabler/icons-react";

interface CommendationsGridProps {
	initialCommendations: Commendation[];
	initialTotalPages: number;
	type?: "civil" | "literary" | "artistic" | "scientific";
}

export function CommendationsGrid({ initialCommendations, initialTotalPages, type }: CommendationsGridProps) {
	const [commendations, setCommendations] = useState<Commendation[]>(initialCommendations);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(initialTotalPages > 1);
	const [selectedType, setSelectedType] = useState<"civil" | "literary" | "artistic" | "scientific" | undefined>(
		type,
	);

	const loadMoreCommendations = async () => {
		if (loading) return;

		setLoading(true);
		try {
			const nextPage = page + 1;
			const result = await fetchCommendations({
				type: selectedType,
				page: nextPage,
				perPage: 9,
			});

			setCommendations(prev => [...prev, ...result.commendations]);
			setPage(nextPage);
			setHasMore(result.hasMore);
		} catch (error) {
			console.error("Erro ao carregar mais comendas:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleTypeFilter = async (newType?: "civil" | "literary" | "artistic" | "scientific") => {
		if (newType === selectedType) return;

		setLoading(true);
		try {
			const result = await fetchCommendations({
				type: newType,
				page: 1,
				perPage: 9,
			});

			setCommendations(result.commendations);
			setPage(1);
			setHasMore(result.hasMore);
			setSelectedType(newType);
		} catch (error) {
			console.error("Erro ao filtrar comendas:", error);
		} finally {
			setLoading(false);
		}
	};

	if (initialCommendations.length === 0) {
		return (
			<div className="my-16 rounded-lg bg-white p-10 text-center shadow-md">
				<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
					<IconSearch className="h-10 w-10 text-amber-800" />
				</div>
				<h4 className="mb-2 font-serif text-xl font-bold text-gray-800">Nenhuma comenda encontrada</h4>
				<p className="mb-6 text-gray-600">Não existem comendas registradas no momento.</p>
				<Link
					href="/comenda"
					className="inline-block rounded-md border border-amber-800 px-6 py-3 font-medium text-amber-800 transition-colors hover:bg-amber-800 hover:text-white"
				>
					Ver todas as comendas
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="mb-8 flex flex-wrap items-center justify-center gap-4">
				<button
					onClick={() => handleTypeFilter(undefined)}
					type="button"
					className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium ${
						selectedType === undefined
							? "bg-amber-800 text-white"
							: "border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
					}`}
				>
					Todos
				</button>
				<button
					onClick={() => handleTypeFilter("civil")}
					type="button"
					className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium ${
						selectedType === "civil"
							? "bg-amber-800 text-white"
							: "border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
					}`}
				>
					Civil
				</button>
				<button
					onClick={() => handleTypeFilter("literary")}
					type="button"
					className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium ${
						selectedType === "literary"
							? "bg-amber-800 text-white"
							: "border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
					}`}
				>
					Literário
				</button>
				<button
					onClick={() => handleTypeFilter("artistic")}
					type="button"
					className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium ${
						selectedType === "artistic"
							? "bg-amber-800 text-white"
							: "border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
					}`}
				>
					Artístico
				</button>
				<button
					onClick={() => handleTypeFilter("scientific")}
					type="button"
					className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium ${
						selectedType === "scientific"
							? "bg-amber-800 text-white"
							: "border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
					}`}
				>
					Científico
				</button>
			</div>

			{commendations.length === 0 ? (
				<div className="my-8 rounded-lg bg-white p-10 text-center shadow-md">
					<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
						<IconSearch className="h-10 w-10 text-amber-800" />
					</div>
					<h4 className="mb-2 font-serif text-xl font-bold text-gray-800">Nenhum resultado encontrado</h4>
					<p className="mb-6 text-gray-600">
						{selectedType
							? `Não foram encontradas comendas do tipo ${
									selectedType === "civil"
										? "Civil"
										: selectedType === "literary"
											? "Literário"
											: selectedType === "artistic"
												? "Artístico"
												: "Científico"
								}.`
							: `Não foram encontradas comendas.`}
					</p>
					<button
						onClick={() => {
							handleTypeFilter(undefined);
						}}
						className="inline-block rounded-md border border-amber-800 px-6 py-3 font-medium text-amber-800 transition-colors hover:bg-amber-800 hover:text-white"
					>
						Limpar filtros
					</button>
				</div>
			) : (
				<InfiniteScroll
					dataLength={commendations.length}
					next={loadMoreCommendations}
					hasMore={hasMore}
					loader={
						<div className="my-8 flex justify-center">
							<div className="flex items-center gap-3">
								<IconLoader className="h-6 w-6 animate-spin text-amber-800" />
								<span className="text-amber-800">Carregando mais comendas...</span>
							</div>
						</div>
					}
					endMessage={
						commendations.length >= 12 ? (
							<div className="my-8 text-center text-gray-600">
								<p>Você chegou ao final das comendas disponíveis.</p>
							</div>
						) : undefined
					}
				>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{commendations.map((item: Commendation, i) => {
							const typeLabel =
								item.type === "civil"
									? "Civil"
									: item.type === "literary"
										? "Literário"
										: item.type === "artistic"
											? "Artístico"
											: "Científico";

							return (
								<div
									key={item.id}
									className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]"
								>
									<div className="relative h-48 w-full bg-slate-400">
										{item.image && typeof item.image !== "number" && (
											<Image
												src={item.image.url || ""}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												alt={item.name}
												className="object-cover"
												priority={i < 3}
											/>
										)}
										<div className="absolute top-0 right-0 m-2 rounded-md bg-amber-700 px-2 py-1 text-xs font-medium text-white">
											{typeLabel}
										</div>
									</div>
									<div className="p-6">
										<h4 className="mb-2 text-xl font-bold text-gray-800">{item.name}</h4>
										<div className="mt-4 flex items-center justify-between">
											<Link
												href={`/comenda/${item.id}`}
												className="flex items-center font-medium text-amber-800 hover:text-amber-900"
											>
												Ver detalhes
												<IconArrowRight className="ml-2 h-4 w-4" />
											</Link>
											<div className="flex items-center text-amber-700">
												<IconMedal className="mr-1 h-5 w-5" />
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</InfiniteScroll>
			)}
		</>
	);
}
