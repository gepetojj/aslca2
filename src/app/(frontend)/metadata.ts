import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Academia Santanense de Letras, Ciências e Artes | ASLCA",
	description:
		"Site institucional e acervo digital da Academia Santanense de Letras, Ciências e Artes de Santana do Ipanema, Alagoas. Promovendo a literatura, cultura, ciência e arte na região do sertão alagoano.",
	keywords: ["academia", "literatura", "cultura", "ciência", "arte", "Santana do Ipanema", "Alagoas", "ASLCA"],
	authors: [{ name: "Academia Santanense de Letras, Ciências e Artes" }],
	creator: "Academia Santanense de Letras, Ciências e Artes",
	publisher: "Academia Santanense de Letras, Ciências e Artes",
	openGraph: {
		type: "website",
		locale: "pt_BR",
		url: "https://aslca.org.br",
		title: "Academia Santanense de Letras, Ciências e Artes | ASLCA",
		description:
			"Site institucional e acervo digital da Academia Santanense de Letras, Ciências e Artes de Santana do Ipanema, Alagoas. Promovendo a literatura, cultura, ciência e arte na região do sertão alagoano.",
		siteName: "Academia Santanense de Letras, Ciências e Artes",
	},
	twitter: {
		card: "summary_large_image",
		title: "Academia Santanense de Letras, Ciências e Artes | ASLCA",
		description:
			"Site institucional e acervo digital da Academia Santanense de Letras, Ciências e Artes de Santana do Ipanema, Alagoas.",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			"index": true,
			"follow": true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "https://aslca.org.br",
		languages: {
			"pt-BR": "https://aslca.org.br",
		},
	},
	other: {
		"json-ld": [
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				"name": "Academia Santanense de Letras, Ciências e Artes",
				"alternateName": "ASLCA",
				"url": "https://aslca.org.br",
				"logo": "https://aslca.org.br/logo.webp",
				"description":
					"Site institucional e acervo digital da Academia Santanense de Letras, Ciências e Artes de Santana do Ipanema, Alagoas.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Santana do Ipanema",
					"addressRegion": "AL",
					"addressCountry": "BR",
				},
				"sameAs": ["https://instagram.com/asclasi"],
			}),
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				"name": "Academia Santanense de Letras, Ciências e Artes",
				"url": "https://aslca.org.br",
				"potentialAction": {
					"@type": "SearchAction",
					"target": {
						"@type": "EntryPoint",
						"urlTemplate": "https://aslca.org.br/search?q={search_term_string}",
					},
					"query-input": "required name=search_term_string",
				},
			}),
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				"itemListElement": [
					{
						"@type": "ListItem",
						"position": 1,
						"name": "Início",
						"item": "https://aslca.org.br",
					},
				],
			}),
		],
	},
};
