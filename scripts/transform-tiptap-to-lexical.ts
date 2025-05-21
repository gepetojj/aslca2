/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { BasePayload } from "payload";

export async function convertTipTapToLexical(
	tiptapJsonString: string,
	payload: BasePayload,
): Promise<{
	[k: string]: unknown;
	root: {
		type: string;
		children: { [k: string]: unknown; type: string; version: number }[];
		direction: "ltr" | "rtl" | null;
		format: "" | "left" | "start" | "center" | "right" | "end" | "justify";
		indent: number;
		version: number;
	};
}> {
	try {
		// Faz o parse da string para um objeto
		const tiptapContent = typeof tiptapJsonString === "string" ? JSON.parse(tiptapJsonString) : tiptapJsonString;

		// Inicializa a estrutura base do Lexical
		const lexicalOutput = {
			root: {
				type: "root",
				format: "",
				indent: 0,
				version: 1,
				children: [],
				direction: "ltr",
			},
		};

		// Verifica se a estrutura do TipTap é válida
		if (!tiptapContent.content || !tiptapContent.content.content || !Array.isArray(tiptapContent.content.content)) {
			throw new Error("Estrutura TipTap inválida");
		}

		// Função interna: Gera um ID único
		function generateUniqueId() {
			const timestamp = Math.floor(Date.now() / 1000)
				.toString(16)
				.padStart(8, "0");
			const machineId = Math.floor(Math.random() * 16777216)
				.toString(16)
				.padStart(6, "0");
			const processId = Math.floor(Math.random() * 65536)
				.toString(16)
				.padStart(4, "0");
			const counter = Math.floor(Math.random() * 16777216)
				.toString(16)
				.padStart(6, "0");
			return timestamp + machineId + processId + counter;
		}

		// Função interna: Escapa caracteres especiais no texto
		function escapeSpecialChars(text: string) {
			if (!text) return "";
			return text
				.replace(/\\/g, "\\\\") // Barra invertida primeiro
				.replace(/"/g, '\\"') // Aspas duplas
				.replace(/\n/g, "\\n") // Nova linha
				.replace(/\r/g, "\\r") // Retorno de carro
				.replace(/\t/g, "\\t") // Tab
				.replace(/\f/g, "\\f"); // Form feed
		}

		// Função interna: Converte formatação de texto
		function convertTextFormat(marks: any[]) {
			if (!marks || !marks.length) return 0;

			let formatValue = 0;
			const formatMap = {
				bold: 1,
				italic: 2,
				underline: 4,
				strikethrough: 8,
				code: 16,
				subscript: 32,
				superscript: 64,
			};

			marks.forEach(mark => {
				if (formatMap[mark.type] !== undefined) {
					formatValue |= formatMap[mark.type];
				}
			});

			return formatValue;
		}

		// Função interna: Converte texto e suas marcações
		function convertText(node: any) {
			const escapedText = escapeSpecialChars(node.text);

			// Texto sem marcas
			if (!node.marks || node.marks.length === 0) {
				return {
					mode: "normal",
					text: escapedText,
					type: "text",
					style: "",
					detail: 0,
					format: 0,
					version: 1,
				};
			}

			// Verifica links
			const linkMark = node.marks.find(mark => mark.type === "link");
			if (linkMark) {
				// Determina o tipo do link
				const url = linkMark.attrs.href;

				// Retorna nó de link
				return {
					id: generateUniqueId(),
					type: "link",
					fields: {
						url: url,
						newTab: linkMark.attrs.target === "_blank",
						linkType: "custom",
					},
					format: "",
					indent: 0,
					version: 3,
					children: [
						{
							mode: "normal",
							text: escapedText,
							type: "text",
							style: "",
							detail: 0,
							format: convertTextFormat(node.marks.filter(m => m.type !== "link")),
							version: 1,
						},
					],
					direction: "ltr",
				};
			} else {
				// Texto com outras formatações
				return {
					mode: "normal",
					text: escapedText,
					type: "text",
					style: "",
					detail: 0,
					format: convertTextFormat(node.marks),
					version: 1,
				};
			}
		}

		// Função interna: Converte conteúdo inline
		async function convertInlineContent(node) {
			if (node.type === "text") {
				return convertText(node);
			} else if (node.type === "hardBreak") {
				return {
					type: "linebreak",
					version: 1,
				};
			} else if (node.type === "image") {
				const src = node.attrs?.src;
				if (!src) {
					console.warn("Imagem sem URL fornecida");
					return null;
				}

				const blob = await fetch(src).then(res => res.blob());
				const buffer = Buffer.from(await blob.arrayBuffer());
				const image = await payload.create({
					collection: "media",
					data: {
						alt: "Imagem adicionada pelo(a) autor(a).",
					},
					file: {
						data: buffer,
						mimetype: blob.type,
						name: "imagem-adicionada-" + Date.now(),
						size: buffer.byteLength,
					},
				});

				return {
					id: generateUniqueId(),
					type: "upload",
					value: image.id,
					fields: {
						src,
					},
					format: "",
					version: 3,
					relationTo: "media",
				};
			} else {
				console.warn(`Tipo de conteúdo inline não suportado: ${node.type}`);
				return null;
			}
		}

		// Função interna: Converte parágrafo
		async function convertParagraph(node) {
			const textAlign = node.attrs?.textAlign || "left";
			const direction = textAlign === "right" ? "rtl" : "ltr";

			const paragraph = {
				type: "paragraph",
				format: "",
				indent: 0,
				version: 1,
				children: [],
				direction: direction,
				textStyle: "",
				textFormat: 0,
			};

			// Adiciona o alinhamento
			if (textAlign !== "left") {
				paragraph.format = textAlign;
			}

			// Converte o conteúdo do parágrafo
			if (node.content && Array.isArray(node.content)) {
				for (const child of node.content) {
					const convertedChild = await convertInlineContent(child);
					if (convertedChild) {
						if (Array.isArray(convertedChild)) {
							paragraph.children.push(...convertedChild);
						} else {
							paragraph.children.push(convertedChild);
						}
					}
				}
			}

			return paragraph;
		}

		// Função interna: Converte heading
		async function convertHeading(node) {
			const level = node.attrs?.level || 1;

			const heading = {
				type: "heading",
				tag: `h${level}`,
				format: "",
				indent: 0,
				version: 1,
				children: [],
				direction: "ltr",
				textStyle: "",
				textFormat: 0,
			};

			// Adiciona o alinhamento
			if (node.attrs?.textAlign && node.attrs.textAlign !== "left") {
				heading.format = node.attrs.textAlign;
			}

			// Converte o conteúdo do heading
			if (node.content && Array.isArray(node.content)) {
				for (const child of node.content) {
					const convertedChild = await convertInlineContent(child);
					if (convertedChild) {
						if (Array.isArray(convertedChild)) {
							heading.children.push(...convertedChild);
						} else {
							heading.children.push(convertedChild);
						}
					}
				}
			}

			return heading;
		}

		// Função interna: Converte blockquote
		function convertBlockquote(node) {
			const quote = {
				type: "quote",
				format: "",
				indent: 0,
				version: 1,
				children: [],
				direction: "ltr",
			};

			// Converte o conteúdo do blockquote
			if (node.content && Array.isArray(node.content)) {
				node.content.forEach(child => {
					const convertedChild = convertNode(child);
					if (convertedChild) {
						if (Array.isArray(convertedChild)) {
							quote.children.push(...convertedChild);
						} else {
							quote.children.push(convertedChild);
						}
					}
				});
			}

			return quote;
		}

		// Função interna: Converte imagem
		async function convertImage(node: { type: "image"; attrs: { src?: string } }) {
			const mediaId = generateUniqueId();
			const src = node.attrs?.src;
			if (!src) {
				console.warn("Imagem sem URL fornecida");
				return [];
			}

			const blob = await fetch(src).then(res => res.blob());
			const buffer = Buffer.from(await blob.arrayBuffer());
			const image = await payload.create({
				collection: "media",
				data: {
					alt: "Imagem adicionada pelo(a) autor(a).",
				},
				file: {
					data: buffer,
					mimetype: blob.type,
					name: "imagem-adicionada-" + Date.now(),
					size: buffer.byteLength,
				},
			});

			return [
				{
					id: mediaId,
					type: "upload",
					value: image.id,
					fields: {
						src,
					},
					format: "",
					version: 3,
					relationTo: "media",
				},
				{
					type: "paragraph",
					format: "",
					indent: 0,
					version: 1,
					children: [],
					direction: null,
					textStyle: "",
					textFormat: 0,
				},
			];
		}

		// Função interna: Converte regra horizontal
		function convertHorizontalRule() {
			return [
				{
					type: "horizontalrule",
					version: 1,
				},
				{
					type: "paragraph",
					format: "",
					indent: 0,
					version: 1,
					children: [],
					direction: null,
					textStyle: "",
					textFormat: 0,
				},
			];
		}

		// Função interna: Converte lista de marcadores
		function convertBulletList(node) {
			const list = {
				type: "list",
				listType: "bullet",
				format: "",
				indent: 0,
				version: 1,
				children: [],
				direction: "ltr",
			};

			// Converte itens da lista
			if (node.content && Array.isArray(node.content)) {
				node.content.forEach(child => {
					const convertedChild = convertNode(child);
					if (convertedChild) {
						if (Array.isArray(convertedChild)) {
							list.children.push(...convertedChild);
						} else {
							list.children.push(convertedChild);
						}
					}
				});
			}

			return list;
		}

		// Função interna: Converte lista ordenada
		function convertOrderedList(node) {
			const list = {
				type: "list",
				listType: "number",
				start: node.attrs?.start || 1,
				format: "",
				indent: 0,
				version: 1,
				children: [],
				direction: "ltr",
			};

			// Converte itens da lista
			if (node.content && Array.isArray(node.content)) {
				node.content.forEach(child => {
					const convertedChild = convertNode(child);
					if (convertedChild) {
						if (Array.isArray(convertedChild)) {
							list.children.push(...convertedChild);
						} else {
							list.children.push(convertedChild);
						}
					}
				});
			}

			return list;
		}

		// Função interna: Converte item de lista
		function convertListItem(node) {
			const listItem = {
				type: "listitem",
				format: "",
				indent: 0,
				version: 1,
				children: [],
				direction: "ltr",
				value: 1,
			};

			// Converte conteúdo do item
			if (node.content && Array.isArray(node.content)) {
				node.content.forEach(child => {
					const convertedChild = convertNode(child);
					if (convertedChild) {
						if (Array.isArray(convertedChild)) {
							listItem.children.push(...convertedChild);
						} else {
							listItem.children.push(convertedChild);
						}
					}
				});
			}

			return listItem;
		}

		// Função interna: Converte nó
		async function convertNode(node) {
			switch (node.type) {
				case "paragraph":
					return convertParagraph(node);
				case "heading":
					return convertHeading(node);
				case "blockquote":
					return convertBlockquote(node);
				case "bulletList":
					return convertBulletList(node);
				case "orderedList":
					return convertOrderedList(node);
				case "listItem":
					return convertListItem(node);
				case "horizontalRule":
					return convertHorizontalRule();
				case "image":
					return await convertImage(node);
				case "hardBreak":
					return {
						type: "linebreak",
						version: 1,
					};
				default:
					console.warn(`Tipo de nó não suportado: ${node.type}`);
					return null;
			}
		}

		for (const node of tiptapContent.content.content) {
			const convertedNode = await convertNode(node);
			if (convertedNode) {
				if (Array.isArray(convertedNode)) {
					lexicalOutput.root.children.push(...convertedNode);
				} else {
					lexicalOutput.root.children.push(convertedNode);
				}
			}
		}

		if (lexicalOutput.root.children.length === 0) {
			lexicalOutput.root.children.push({
				type: "paragraph",
				format: "",
				indent: 0,
				version: 1,
				children: [],
				direction: null,
				textStyle: "",
				textFormat: 0,
			});
		}

		return lexicalOutput;
	} catch (error) {
		console.error("Erro na conversão de TipTap para Lexical:", error);
		throw error;
	}
}
