import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import logo from "@/assets/logo-aslca.webp";
import { IconBrandInstagram, IconMail } from "@tabler/icons-react";

export const Footer: React.FC = memo(function Footer() {
	return (
		<footer className="bg-gray-900 py-12 text-white">
			<div className="container mx-auto px-4">
				<div className="grid gap-10 md:grid-cols-4">
					<div className="w-full max-w-[300px]">
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
						<p className="mb-4 text-gray-400">
							Promovendo a literatura, cultura, ciência e arte em Santana do Ipanema, Alagoas.
						</p>
					</div>

					<div>
						<h4 className="mb-4 text-lg font-bold">Academias</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="https://www.academia.org.br/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									ABL
								</Link>
							</li>
							<li>
								<Link
									href="https://www.aal.al.org.br/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									AAL
								</Link>
							</li>
							<li>
								<Link
									href="http://acala.org.br/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									ACALA
								</Link>
							</li>
							<li>
								<Link
									href="https://apalca.com.br/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									APALCA
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-4 text-lg font-bold">Blogs</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="https://www.apensocomgrifo.com/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Apenso com Grifo
								</Link>
							</li>
							<li>
								<Link
									href="https://clerisvaldobchagas.blogspot.com/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Clerisvaldo Chagas
								</Link>
							</li>
							<li>
								<Link
									href="https://apalavraeparadizer.blogspot.com/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									A palavra é para dizer
								</Link>
							</li>
							<li>
								<Link
									href="https://blogdoetevaldo.blogspot.com/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Blog do Etevaldo
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-4 text-lg font-bold">Jornais da Região</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="https://www.maltanet.com.br/v2/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Maltanet
								</Link>
							</li>
							<li>
								<Link
									href="https://d.gazetadealagoas.com.br/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Gazeta de Alagoas
								</Link>
							</li>
							<li>
								<Link
									href="https://www.historiadealagoas.com.br/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									História de Alagoas
								</Link>
							</li>
							<li>
								<Link
									href="https://www.alagoasnanet.com.br/"
									rel="noopener noreferrer"
									target="_blank"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Alagoas na Net
								</Link>
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
