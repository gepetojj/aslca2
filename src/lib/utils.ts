export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
	const date = new Date(dateString);

	const defaultOptions: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	return date.toLocaleDateString("pt-BR", options || defaultOptions);
}
