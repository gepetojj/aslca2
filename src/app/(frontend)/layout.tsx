import React from "react";

import "./styles.css";

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
				<body>{children}</body>
			</html>
		</>
	);
}
