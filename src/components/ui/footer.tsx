import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import logo from "@/public/logo-aslca.webp";
import { IconBrandInstagram, IconMail, IconMapPin } from "@tabler/icons-react";

export const Footer: React.FC = memo(function Footer() {
	return (
		<footer className="bg-gray-900 py-12 text-white">
			<div className="container mx-auto px-4">
				<div className="grid gap-10 md:grid-cols-3">
					<div>
						<div className="mb-4 flex items-center space-x-3">
							<div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-amber-700">
								<Image
									src={logo}
									alt="Logo da ASLCA"
									className="object-cover"
								/>
							</div>
							<div>
								<h4 className="font-serif text-lg font-bold">ASLCA</h4>
							</div>
						</div>
						<p className="mb-4 text-gray-400">Receba nossas novidades e convites para eventos.</p>
						<div className="flex">
							<input
								type="email"
								placeholder="Seu e-mail"
								className="w-full rounded-l-md bg-gray-800 px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
							/>
							<button className="rounded-r-md bg-amber-700 px-4 py-2 text-white transition-colors hover:bg-amber-800">
								<svg
									className="h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									></path>
								</svg>
							</button>
						</div>
					</div>

					<div>
						<h4 className="mb-4 text-lg font-bold">Links Rápidos</h4>
						<ul className="space-y-2">
							{["Início", "Sobre", "Cadeiras", "Notícias", "Blog", "Contato"].map(item => (
								<li key={item}>
									<a
										href="#"
										className="text-gray-400 transition-colors hover:text-white"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-4 text-lg font-bold">Contato</h4>
						<ul className="space-y-2 text-gray-400">
							<li className="flex items-start">
								<div className="shrink-0">
									<IconMapPin
										size={24}
										className="mt-0.5 mr-2 h-5 w-5 text-amber-500"
									/>
								</div>
								<p>
									Rua Coronel Lucena, 196, Centro - Casa da Cultura de Santana do Ipanema, 57500-000
									<br />
									Santana do Ipanema, AL
								</p>
							</li>
							<li className="flex items-center">
								<svg
									className="mr-2 h-5 w-5 text-amber-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									></path>
								</svg>
								<p>contato@aslca.org.br</p>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-10 flex flex-col items-center justify-between border-t border-gray-800 pt-6 md:flex-row">
					<p className="text-sm text-gray-400">
						© {new Date().getFullYear()} Academia Santanense de Letras, Ciências e Artes. Todos os direitos
						reservados.
					</p>
					<div className="mt-4 flex space-x-4 md:mt-0">
						<Link
							rel="noopener noreferrer"
							target="_blank"
							href="https://www.instagram.com/asclasi"
							className="text-gray-400 transition-colors hover:text-white"
						>
							<span className="sr-only">Abrir Instagram da ASLCA</span>
							<IconBrandInstagram size={24} />
						</Link>
						<Link
							rel="noopener noreferrer"
							target="_blank"
							href="mailto:aslca.contato@gmail.com"
							className="text-gray-400 transition-colors hover:text-white"
						>
							<span className="sr-only">Abrir e-mail da ASLCA</span>
							<IconMail size={24} />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
});
