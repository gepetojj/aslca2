import React from "react";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "./globals.css";

export const metadata = {
	description: "Site institucional e acervo digital da Academia Santanense de Letras, Ciências e Artes",
	title: "Academia Santanense de Letras, Ciências e Artes",
};

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
				<body>
					<MantineProvider>{children}</MantineProvider>
				</body>
			</html>
		</>
	);
}
