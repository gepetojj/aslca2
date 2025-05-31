"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Event, Media } from "@/payload-types";
import { fetchEvents } from "@/server/actions/events/fetch-events";
import { IconCalendar, IconLoader, IconMapPin, IconSearch } from "@tabler/icons-react";

interface EventsGridProps {
	initialEvents: Event[];
	initialTotalPages: number;
	search?: string;
}

export function EventsGrid({ initialEvents, initialTotalPages, search }: EventsGridProps) {
	const [events, setEvents] = useState<Event[]>(initialEvents);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(initialTotalPages > 1);

	const loadMoreEvents = async () => {
		if (loading) return;

		setLoading(true);
		try {
			const nextPage = page + 1;

			const result = await fetchEvents({
				search,
				page: nextPage,
				perPage: 9,
			});

			setEvents(prevEvents => [...prevEvents, ...result.events]);
			setPage(nextPage);
			setHasMore(result.hasMore);
		} catch (error) {
			console.error("Erro ao carregar mais eventos:", error);
		} finally {
			setLoading(false);
		}
	};

	if (initialEvents.length === 0) {
		return (
			<div className="my-16 rounded-lg bg-white p-10 text-center shadow-md">
				<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
					<IconSearch className="h-10 w-10 text-amber-800" />
				</div>
				<h4 className="mb-2 font-serif text-xl font-bold text-gray-800">Nenhum evento encontrado</h4>
				<p className="mb-6 text-gray-600">
					{search
						? "Não foram encontrados eventos que correspondam à sua pesquisa."
						: "Não existem eventos publicados no momento."}
				</p>
				{search && (
					<Link
						href="/eventos"
						className="inline-flex items-center rounded-md bg-amber-800 px-4 py-2 text-white transition-colors hover:bg-amber-900"
					>
						Ver todos os eventos
					</Link>
				)}
			</div>
		);
	}

	return (
		<div>
			<InfiniteScroll
				dataLength={events.length}
				next={loadMoreEvents}
				hasMore={hasMore}
				loader={
					<div className="my-8 flex justify-center">
						<IconLoader className="h-8 w-8 animate-spin text-amber-800" />
					</div>
				}
			>
				<div className="grid gap-6 px-2 py-14 sm:grid-cols-2 lg:grid-cols-3">
					{events.map(event => (
						<div
							key={event.id}
							className="group relative h-fit overflow-hidden rounded-2xl bg-gradient-to-br from-white via-amber-50/30 to-amber-100/50 shadow-lg ring-1 ring-amber-200/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-amber-300/60"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-200/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

							<div className="relative p-6">
								<h3 className="mb-3 line-clamp-2 font-serif text-xl leading-tight font-bold text-gray-800 transition-colors duration-300 group-hover:text-amber-900">
									{event.title}
								</h3>

								<div className="mb-4 flex flex-wrap items-center gap-3">
									<div className="flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 transition-all duration-300 group-hover:bg-amber-200">
										<IconCalendar className="mr-2 h-4 w-4" />
										<span>{event.date}</span>
									</div>
									{event.location && (
										<div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all duration-300 group-hover:bg-gray-200">
											<IconMapPin className="mr-2 h-4 w-4" />
											<span className="line-clamp-1">{event.location}</span>
										</div>
									)}
								</div>

								{event.description && (
									<p className="mb-4 line-clamp-3 leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
										{event.description}
									</p>
								)}

								{event.image && (
									<div className="mt-4 overflow-hidden rounded-lg">
										<Image
											src={(event.image as Media).url || ""}
											alt={(event.image as Media).alt || "Imagem do evento"}
											width={400}
											height={250}
											className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									</div>
								)}
							</div>

							{/* Subtle border animation */}
							<div
								className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
								style={{
									mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
									WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
									maskComposite: "xor",
									WebkitMaskComposite: "xor",
								}}
							/>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}
