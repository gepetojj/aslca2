"use client";

import Link from "next/link";
import { useState } from "react";

import { Patron } from "@/payload-types";
import { IconSearch } from "@tabler/icons-react";

interface PatronsGridProps {
	initialPatrons: Patron[];
	search?: string;
}

export function PatronsGrid({ initialPatrons, search }: PatronsGridProps) {
	const [patrons, setPatrons] = useState<Patron[]>(initialPatrons);
	const [localSearch, setLocalSearch] = useState<string>(search || "");

	const filterPatrons = (searchTerm: string) => {
		if (!searchTerm.trim()) {
			setPatrons(initialPatrons);
			return;
		}

		const term = searchTerm.toLowerCase();
		const filtered = initialPatrons.filter(
			patron =>
				patron.name.toLowerCase().includes(term) || `cadeira ${patron.chair}`.toLowerCase().includes(term),
		);

		setPatrons(filtered);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setLocalSearch(value);
		filterPatrons(value);
	};

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
					<button
						type="submit"
						className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-amber-800"
					>
						<IconSearch size={20} />
					</button>
				</div>
			</div>

			{patrons.length > 0 ? (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{patrons.map(patron => (
						<div
							key={patron.id}
							className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
						>
							<div className="p-6">
								<div className="mb-2 text-sm font-medium text-amber-800">Cadeira Nº {patron.chair}</div>
								<h3 className="mb-2 font-serif text-xl font-bold text-gray-800">{patron.name}</h3>
								{patron.academic && typeof patron.academic === "object" && (
									<div className="mb-1 text-sm text-gray-600">
										<span className="font-medium">Acadêmico:</span> {patron.academic.name}
									</div>
								)}

								<Link
									className="mt-4 text-sm font-medium text-amber-800 hover:text-amber-700 hover:underline"
									href={`/cadeiras/patronos/${patron.id}`}
								>
									Ver mais
								</Link>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="my-16 rounded-lg p-10 text-center">
					<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
						<IconSearch className="h-10 w-10 text-amber-800" />
					</div>
					<h4 className="mb-2 font-serif text-xl font-bold text-gray-800">Nenhum patrono encontrado</h4>
					<p className="mb-6 text-gray-600">
						{search
							? "Não foram encontrados patronos que correspondam à sua pesquisa."
							: "Não existem patronos cadastrados no momento."}
					</p>
					{localSearch && (
						<button
							onClick={() => {
								setLocalSearch("");
								setPatrons(initialPatrons);
							}}
							className="inline-block rounded-md border border-amber-800 px-6 py-3 font-medium text-amber-800 transition-colors hover:bg-amber-800 hover:text-white"
						>
							Ver todos os patronos
						</button>
					)}
				</div>
			)}
		</>
	);
}
