"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Academic, Media } from "@/payload-types";
import { IconSearch } from "@tabler/icons-react";

interface AcademicsGridProps {
	initialAcademics: Academic[];
	search?: string;
}

export function AcademicsGrid({ initialAcademics, search }: AcademicsGridProps) {
	const [academics, setAcademics] = useState<Academic[]>(initialAcademics);
	const [localSearch, setLocalSearch] = useState<string>(search || "");
	const [activeTab, setActiveTab] = useState<string>("active");

	// Separar acadêmicos por tipo
	const academicsByType = useMemo(() => {
		const academicsMap: Record<string, Academic[]> = {
			active: [],
			benemeritus: [],
			honorary: [],
			correspondent: [],
			inMemoriam: [],
		};

		initialAcademics.forEach(academic => {
			if (academic.type && academicsMap[academic.type]) {
				academicsMap[academic.type].push(academic);
			}
		});

		return academicsMap;
	}, [initialAcademics]);

	const filterAcademics = (searchTerm: string) => {
		if (!searchTerm.trim()) {
			setAcademics(initialAcademics);
			return;
		}

		const term = searchTerm.toLowerCase();
		const filtered = initialAcademics.filter(academic => {
			// Busca por nome
			if (academic.name.toLowerCase().includes(term)) {
				return true;
			}

			// Busca pelo número da cadeira (via patrono)
			if (
				academic.patron?.docs?.[0] &&
				typeof academic.patron.docs[0] === "object" &&
				`cadeira ${academic.patron.docs[0].chair}`.toLowerCase().includes(term)
			) {
				return true;
			}

			return false;
		});

		setAcademics(filtered);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setLocalSearch(value);
		filterAcademics(value);
	};

	// Filtra os acadêmicos por tipo e busca
	const filteredAcademics = useMemo(() => {
		if (localSearch) {
			return academics.filter(academic => academic.type === activeTab);
		}
		return academicsByType[activeTab] || [];
	}, [academics, academicsByType, activeTab, localSearch]);

	return (
		<>
			<div className="mb-12">
				<div className="relative mx-auto max-w-2xl">
					<input
						type="text"
						name="search"
						value={localSearch}
						onChange={handleSearchChange}
						placeholder="Procure por nome ou número da cadeira..."
						className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-700 focus:border-amber-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
					/>
					<button className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-amber-800">
						<IconSearch size={20} />
					</button>
				</div>
			</div>

			{/* Tabs para tipos de acadêmicos */}
			<div className="mb-8">
				<div className="flex flex-wrap border-b border-gray-200">
					<button
						onClick={() => setActiveTab("active")}
						type="button"
						className={`cursor-pointer px-4 py-2 text-sm font-medium ${
							activeTab === "active"
								? "border-b-2 border-amber-800 text-amber-800"
								: "text-gray-600 hover:text-amber-800"
						}`}
					>
						Efetivos
					</button>
					<button
						onClick={() => setActiveTab("benemeritus")}
						type="button"
						className={`cursor-pointer px-4 py-2 text-sm font-medium ${
							activeTab === "benemeritus"
								? "border-b-2 border-amber-800 text-amber-800"
								: "text-gray-600 hover:text-amber-800"
						}`}
					>
						Beneméritos
					</button>
					<button
						onClick={() => setActiveTab("honorary")}
						type="button"
						className={`cursor-pointer px-4 py-2 text-sm font-medium ${
							activeTab === "honorary"
								? "border-b-2 border-amber-800 text-amber-800"
								: "text-gray-600 hover:text-amber-800"
						}`}
					>
						Honorários
					</button>
					<button
						onClick={() => setActiveTab("correspondent")}
						type="button"
						className={`cursor-pointer px-4 py-2 text-sm font-medium ${
							activeTab === "correspondent"
								? "border-b-2 border-amber-800 text-amber-800"
								: "text-gray-600 hover:text-amber-800"
						}`}
					>
						Correspondentes
					</button>
					<button
						onClick={() => setActiveTab("inMemoriam")}
						type="button"
						className={`cursor-pointer px-4 py-2 text-sm font-medium ${
							activeTab === "inMemoriam"
								? "border-b-2 border-amber-800 text-amber-800"
								: "text-gray-600 hover:text-amber-800"
						}`}
					>
						In Memoriam
					</button>
				</div>
			</div>

			{filteredAcademics.length > 0 ? (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredAcademics.map(academic => {
						const imageUrl =
							typeof academic.image === "object" && academic.image
								? (academic.image as Media).url
								: "/media/placeholder.png";

						const patronInfo =
							academic.patron?.docs?.[0] && typeof academic.patron.docs?.[0] === "object"
								? `Cadeira Nº ${academic.patron.docs?.[0].chair}`
								: "";

						return (
							<div
								key={academic.id}
								className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
							>
								<div className="relative h-48 w-full">
									<Image
										src={imageUrl || ""}
										alt={academic.name}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										priority={false}
									/>
								</div>
								<div className="p-6">
									{patronInfo && (
										<div className="mb-2 text-sm font-medium text-amber-800">{patronInfo}</div>
									)}
									<h3 className="mb-3 font-serif text-xl font-bold text-gray-800">{academic.name}</h3>

									<Link
										className="mt-4 text-sm font-medium text-amber-800 hover:text-amber-700 hover:underline"
										href={`/cadeiras/academicos/${academic.id}`}
									>
										Ver perfil
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="my-16 rounded-lg p-10 text-center">
					<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
						<IconSearch className="h-10 w-10 text-amber-800" />
					</div>
					<h4 className="mb-2 font-serif text-xl font-bold text-gray-800">Nenhum acadêmico encontrado</h4>
					<p className="mb-6 text-gray-600">
						{localSearch
							? "Não foram encontrados acadêmicos que correspondam à sua pesquisa."
							: `Não existem acadêmicos ${
									activeTab === "active"
										? "efetivos"
										: activeTab === "benemeritus"
											? "beneméritos"
											: activeTab === "honorary"
												? "honorários"
												: activeTab === "correspondent"
													? "correspondentes"
													: "in memoriam"
								} cadastrados no momento.`}
					</p>
					{localSearch && (
						<button
							onClick={() => {
								setLocalSearch("");
								setAcademics(initialAcademics);
							}}
							className="rounded-md bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
						>
							Limpar pesquisa
						</button>
					)}
				</div>
			)}
		</>
	);
}
