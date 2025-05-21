"use client";

import { useState } from "react";
import { Document, Page as PDFPage, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export default function Page() {
	const [numPages, setNumPages] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	function goToPreviousPage() {
		setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
	}

	function goToNextPage() {
		setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));
	}

	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Estatuto</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							Conheça o documento que define as diretrizes e normas da Academia Santanense de Letras,
							Ciências e Artes.
						</p>
					</div>
				</section>

				<section className="py-16">
					<div className="mx-auto w-full max-w-4xl px-4 text-justify">
						<div className="flex flex-col items-center">
							<div className="mb-8 w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-4 shadow-md">
								<Document
									file="/estatuto-ascla.pdf"
									onLoadSuccess={onDocumentLoadSuccess}
									loading={
										<div className="flex h-[600px] w-full items-center justify-center">
											<div className="flex flex-col items-center justify-center text-center">
												<div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-600 border-t-transparent"></div>
												<p className="mt-2 text-lg text-gray-600">Carregando documento...</p>
											</div>
										</div>
									}
									error={
										<div className="flex h-[600px] w-full items-center justify-center bg-gray-100">
											<p className="text-center text-lg text-red-500">
												Erro ao carregar o documento. Por favor, tente novamente.
											</p>
										</div>
									}
									className="flex items-center justify-center"
								>
									<PDFPage
										pageNumber={pageNumber}
										renderTextLayer={true}
										renderAnnotationLayer={true}
									/>
								</Document>
							</div>

							<div className="mt-4 flex w-full justify-between px-4">
								<button
									onClick={goToPreviousPage}
									disabled={pageNumber <= 1}
									className={`cursor-pointer rounded-md bg-amber-600 px-4 py-2 text-white transition hover:bg-amber-700 ${
										pageNumber <= 1 ? "cursor-not-allowed opacity-50" : ""
									}`}
								>
									Anterior
								</button>

								<p className="flex items-center text-lg">
									Página {pageNumber} de {numPages || "..."}{" "}
								</p>

								<button
									onClick={goToNextPage}
									disabled={pageNumber >= (numPages || 1)}
									className={`cursor-pointer rounded-md bg-amber-600 px-4 py-2 text-white transition hover:bg-amber-700 ${
										pageNumber >= (numPages || 1) ? "cursor-not-allowed opacity-50" : ""
									}`}
								>
									Próxima
								</button>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
