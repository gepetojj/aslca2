import { IconCalendar } from "@tabler/icons-react";

export default function Loading() {
	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<div className="container mx-auto my-12 px-4">
				{/* Esqueleto do cabeçalho */}
				<div className="relative animate-pulse bg-gray-200 py-20">
					<div className="container mx-auto px-4 text-center">
						<div className="mx-auto mb-4 h-12 w-1/3 rounded bg-gray-300" />
						<div className="mx-auto h-6 w-2/3 rounded bg-gray-300" />
					</div>
				</div>

				{/* Esqueleto do formulário de busca */}
				<div className="my-12">
					<div className="mx-auto flex max-w-2xl">
						<div className="w-full rounded-l-md bg-gray-200 px-4 py-3" />
						<div className="rounded-r-md bg-amber-200 px-8" />
					</div>
				</div>

				{/* Esqueleto do filtro de data */}
				<div className="mb-12 rounded-lg bg-white p-6 shadow-md">
					<div className="mb-4 h-8 w-1/4 rounded bg-gray-200" />
					<div className="flex flex-wrap gap-6">
						<div className="w-full md:w-auto">
							<div className="mb-2 h-5 w-36 rounded bg-gray-200" />
							<div className="h-10 w-72 rounded bg-gray-100" />
						</div>
						<div className="w-full md:w-auto">
							<div className="mb-2 h-5 w-36 rounded bg-gray-200" />
							<div className="flex gap-4">
								<div className="h-5 w-5 rounded-full bg-gray-100" />
								<div className="h-5 w-24 rounded bg-gray-100" />
								<div className="h-5 w-5 rounded-full bg-gray-100" />
								<div className="h-5 w-24 rounded bg-gray-100" />
							</div>
						</div>
						<div className="flex w-full items-end gap-4 md:w-auto">
							<div className="h-10 w-32 rounded bg-amber-100" />
						</div>
					</div>
				</div>

				{/* Esqueleto dos cards de eventos */}
				<div className="my-8 flex justify-center">
					<div className="flex flex-col items-center">
						<IconCalendar className="mb-4 h-12 w-12 animate-pulse text-amber-800" />
						<p className="text-lg text-gray-600">Carregando eventos...</p>
					</div>
				</div>
			</div>
		</div>
	);
}
