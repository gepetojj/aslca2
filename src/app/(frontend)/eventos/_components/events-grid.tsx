"use client";

import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { formatDate } from "@/lib/utils";
import { Event } from "@/payload-types";
import { fetchEvents } from "@/server/actions/events/fetch-events";
import { Box, Group, Radio, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconLoader, IconSearch } from "@tabler/icons-react";

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

	// Filtros de data
	const [dateValue, setDateValue] = useState<Date | null>(null);
	const [dateFilterType, setDateFilterType] = useState<"before" | "after" | null>(null);
	const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

	const loadMoreEvents = async () => {
		if (loading) return;

		setLoading(true);
		try {
			const nextPage = page + 1;

			const dateFilter =
				dateValue && dateFilterType
					? {
							date: dateValue.toISOString(),
							type: dateFilterType,
						}
					: undefined;

			const result = await fetchEvents({
				search,
				page: nextPage,
				perPage: 9,
				dateFilter,
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

	const applyFilters = async () => {
		if (!dateValue || !dateFilterType) return;

		setLoading(true);
		try {
			const dateFilter = {
				date: dateValue.toISOString(),
				type: dateFilterType,
			};

			const result = await fetchEvents({
				search,
				page: 1,
				perPage: 9,
				dateFilter,
			});

			setEvents(result.events);
			setPage(1);
			setHasMore(result.hasMore);
			setFiltersApplied(true);
		} catch (error) {
			console.error("Erro ao aplicar filtros:", error);
		} finally {
			setLoading(false);
		}
	};

	const clearFilters = async () => {
		setDateValue(null);
		setDateFilterType(null);
		setFiltersApplied(false);

		setLoading(true);
		try {
			const result = await fetchEvents({
				search,
				page: 1,
				perPage: 9,
			});

			setEvents(result.events);
			setPage(1);
			setHasMore(result.hasMore);
		} catch (error) {
			console.error("Erro ao limpar filtros:", error);
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
						: filtersApplied
							? "Não existem eventos que correspondam aos filtros aplicados."
							: "Não existem eventos publicados no momento."}
				</p>
				{(search || filtersApplied) && (
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
			{/* Filtros de data */}
			<div className="mb-12 rounded-lg bg-white p-6 shadow-md">
				<h3 className="mb-4 font-serif text-xl font-bold text-gray-800">Filtrar eventos por data</h3>
				<div className="flex flex-wrap items-center gap-6">
					<Box className="w-full md:w-auto">
						<Text
							size="sm"
							mb={4}
							className="text-gray-700"
						>
							Selecione uma data
						</Text>
						<DatePickerInput
							value={dateValue}
							onChange={setDateValue}
							size="sm"
							className="max-w-72"
							placeholder="Selecione uma data"
							classNames={{
								root: "mb-4",
							}}
							rightSection={<IconCalendar size={16} />}
						/>
					</Box>

					<Box className="w-full md:w-auto">
						<Text
							size="sm"
							mb={4}
							className="text-gray-700"
						>
							Mostrar eventos
						</Text>
						<Radio.Group
							value={dateFilterType || ""}
							onChange={value => setDateFilterType(value as "before" | "after")}
							classNames={{
								root: "mb-4",
							}}
						>
							<Group>
								<Radio
									value="before"
									label="Antes desta data"
								/>
								<Radio
									value="after"
									label="Após esta data"
								/>
							</Group>
						</Radio.Group>
					</Box>

					<div className="flex w-full flex-wrap items-end gap-4 md:w-auto">
						<button
							onClick={applyFilters}
							disabled={!dateValue || !dateFilterType}
							className="rounded-md bg-amber-800 px-4 py-2 text-white transition-colors hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-50"
						>
							Aplicar filtros
						</button>

						{filtersApplied && (
							<button
								onClick={clearFilters}
								className="rounded-md border border-amber-800 bg-transparent px-4 py-2 text-amber-800 transition-colors hover:bg-amber-50"
							>
								Limpar filtros
							</button>
						)}
					</div>
				</div>
			</div>

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
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{events.map(event => (
						<div
							key={event.id}
							className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
						>
							<div className="p-6">
								<h3 className="mb-2 line-clamp-2 font-serif text-xl font-bold text-gray-800">
									{event.title}
								</h3>

								<div className="mb-4 flex items-center text-sm text-gray-600">
									<IconCalendar className="mr-2 h-4 w-4" />
									<span>{formatDate(event.date)}</span>
								</div>

								<p className="mb-4 line-clamp-3 text-gray-600">
									{event.description || "Local: " + event.location}
								</p>
							</div>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}
