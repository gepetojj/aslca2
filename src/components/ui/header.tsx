"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";

import logo from "@/public/logo-aslca.webp";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";

export const Header: React.FC = memo(function Header() {
	const [drawerOpened, setDrawerOpened] = useState(false);
	const { width } = useViewportSize();

	return (
		<header className="bg-white shadow-md">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<Link href="/">
							<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
								<Image
									src={logo}
									alt="Logo da ASLCA"
									className="object-cover"
								/>
							</div>
						</Link>
						<div>
							<h1 className="font-serif text-xl font-bold text-amber-900">ASLCA</h1>
							<p className="text-xs text-amber-800 italic">
								Academia Santanense de Letras, Ciências e Artes
							</p>
						</div>
					</div>

					<nav className="hidden items-center space-x-8 md:flex">
						<Link
							href="/"
							className="font-medium text-gray-700 transition-colors hover:text-amber-800"
						>
							Início
						</Link>
						<Link
							href="/"
							className="font-medium text-gray-700 transition-colors hover:text-amber-800"
						>
							Sobre
						</Link>
						<Link
							href="/"
							className="font-medium text-gray-700 transition-colors hover:text-amber-800"
						>
							Cadeiras
						</Link>
						<Link
							href="/noticias"
							className="font-medium text-gray-700 transition-colors hover:text-amber-800"
						>
							Notícias
						</Link>
						<Link
							href="/blog"
							className="font-medium text-gray-700 transition-colors hover:text-amber-800"
						>
							Blog
						</Link>
						<Link
							href="/contato"
							className="font-medium text-gray-700 transition-colors hover:text-amber-800"
						>
							Contato
						</Link>
						<Button
							component={Link}
							href="/admin"
							color="orange.9"
							className="rounded-md px-6 py-2 text-white transition-colors hover:bg-amber-900"
						>
							Entrar
						</Button>
					</nav>

					<div className="md:hidden">
						<ActionIcon
							variant="subtle"
							color="#364153"
							onClick={() => setDrawerOpened(true)}
						>
							<IconMenu2 size={22} />
						</ActionIcon>
					</div>
				</div>
			</div>

			<Drawer
				opened={drawerOpened && width < 768}
				onClose={() => setDrawerOpened(false)}
				title="Menu"
				padding="xl"
				size="md"
			>
				<nav className="flex flex-col space-y-4">
					{["Início", "Sobre", "Cadeiras", "Notícias", "Blog", "Contato"].map(item => (
						<a
							key={item}
							href="#"
							className="font-medium text-gray-700 transition-colors hover:text-amber-800"
						>
							{item}
						</a>
					))}
					<Button
						component={Link}
						href="/admin"
						color="orange.9"
						className="rounded-md px-6 py-2 text-white transition-colors hover:bg-amber-900"
					>
						Entrar
					</Button>
				</nav>
			</Drawer>
		</header>
	);
});
