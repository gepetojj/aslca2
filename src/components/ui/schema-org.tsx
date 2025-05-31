"use client";

import { useEffect } from "react";

type SchemaOrgProps = {
	jsonLd: Record<string, any> | Record<string, any>[];
};

export default function SchemaOrg({ jsonLd }: SchemaOrgProps) {
	useEffect(() => {
		// Adicionar as tags script diretamente no head durante o carregamento do cliente
		const scripts = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

		const elements = scripts.map((script, index) => {
			const scriptElement = document.createElement("script");
			scriptElement.type = "application/ld+json";
			scriptElement.textContent = JSON.stringify(script);
			scriptElement.id = `jsonld-${index}`;
			return scriptElement;
		});

		elements.forEach(el => document.head.appendChild(el));

		// Limpar os scripts quando o componente for desmontado
		return () => {
			elements.forEach((el, index) => {
				const scriptToRemove = document.getElementById(`jsonld-${index}`);
				if (scriptToRemove) {
					document.head.removeChild(scriptToRemove);
				}
			});
		};
	}, [jsonLd]);

	// Este componente não renderiza nada visível
	return null;
}
