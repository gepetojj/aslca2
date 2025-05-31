import React from "react";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "./globals.css";
import JsonLd from "./script-tags";

export { metadata } from "./metadata";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<html
				lang="pt-BR"
				dir="ltr"
			>
				<head>
					<JsonLd
						jsonLd={[
							JSON.stringify({
								"@context": "https://schema.org",
								"@type": "Organization",
								"name": "Academia Santanense de Letras, Ciências e Artes",
								"url": "https://aslca.org.br",
								"logo": "https://aslca.org.br/logo.webp",
							}),
						]}
					/>
				</head>
				<body>
					<MantineProvider>{children}</MantineProvider>
				</body>
			</html>
		</>
	);
}
