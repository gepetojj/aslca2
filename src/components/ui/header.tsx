import Image from "next/image";
import { memo } from "react";

import logo from "@/public/logo-aslca.webp";
import { Button } from "@mantine/core";

export const Header: React.FC = memo(function Header() {
	return (
		<header className="bg-white shadow-md">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
							<Image
								src={logo}
								alt="Logo da ASLCA"
								className="object-cover"
							/>
						</div>
						<div>
							<h1 className="font-serif text-xl font-bold text-amber-900">ASLCA</h1>
							<p className="text-xs text-amber-800 italic">
								Academia Santanense de Letras, Ciências e Artes
							</p>
						</div>
					</div>

					{/* Navigation - Desktop */}
					<nav className="hidden items-center space-x-8 md:flex">
						{["Início", "Sobre", "Cadeiras", "Notícias", "Blog", "Contato"].map(item => (
							<a
								key={item}
								href="#"
								className="font-medium text-gray-700 transition-colors hover:text-amber-800"
							>
								{item}
							</a>
						))}
						<Button className="rounded-md bg-amber-800 px-6 py-2 text-white transition-colors hover:bg-amber-900">
							Entrar
						</Button>
					</nav>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button className="p-2 text-gray-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line
									x1="3"
									y1="12"
									x2="21"
									y2="12"
								></line>
								<line
									x1="3"
									y1="6"
									x2="21"
									y2="6"
								></line>
								<line
									x1="3"
									y1="18"
									x2="21"
									y2="18"
								></line>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
});
