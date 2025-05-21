import Link from "next/link";

import { IconCalendarOff } from "@tabler/icons-react";

export default function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center">
			<IconCalendarOff className="mb-6 h-16 w-16 text-amber-800" />
			<h1 className="mb-4 text-center font-serif text-3xl font-bold text-gray-800">Página não encontrada</h1>
			<p className="mb-8 text-center text-gray-600">
				A página de eventos que você está procurando não existe ou foi removida.
			</p>
			<Link
				href="/eventos"
				className="rounded-md bg-amber-800 px-6 py-3 text-white transition-colors hover:bg-amber-900"
			>
				Ver todos os eventos
			</Link>
		</div>
	);
}
