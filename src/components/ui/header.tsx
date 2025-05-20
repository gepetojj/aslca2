"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";

import logo from "@/assets/logo-aslca.webp";
import { ActionIcon, Button, Drawer, Menu } from "@mantine/core";
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
						<Menu
							trigger="hover"
							position="bottom"
							withArrow
							classNames={{
								dropdown: "font-serif",
							}}
						>
							<Menu.Target>
								<button className="font-medium text-gray-700 transition-colors hover:text-amber-800">
									Sobre
								</button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									component={Link}
									href="/sobre/historia"
								>
									História
								</Menu.Item>
								<Menu.Item
									component={Link}
									href="/sobre/estatuto"
								>
									Estatuto
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
						<Menu
							trigger="hover"
							position="bottom"
							withArrow
							classNames={{
								dropdown: "font-serif",
							}}
						>
							<Menu.Target>
								<button className="font-medium text-gray-700 transition-colors hover:text-amber-800">
									Cadeiras
								</button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									component={Link}
									href="/cadeiras/patronos"
									className="!text-center"
								>
									Patronos
								</Menu.Item>
								<Menu.Item
									component={Link}
									href="/cadeiras/academicos"
									className="!text-center"
								>
									Acadêmicos
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
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
							href="/comenda"
							className="font-medium text-gray-700 transition-colors hover:text-amber-800"
						>
							Comenda Breno Accioly
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
					<Link
						href="/"
						className="font-medium text-gray-700 transition-colors hover:text-amber-800"
					>
						Início
					</Link>
					<Link
						href="/sobre/historia"
						className="font-medium text-gray-700 transition-colors hover:text-amber-800"
					>
						História
					</Link>
					<Link
						href="/sobre/estatuto"
						className="font-medium text-gray-700 transition-colors hover:text-amber-800"
					>
						Estatuto
					</Link>
					<Link
						href="/cadeiras/academicos"
						className="font-medium text-gray-700 transition-colors hover:text-amber-800"
					>
						Acadêmicos
					</Link>
					<Link
						href="/cadeiras/patronos"
						className="font-medium text-gray-700 transition-colors hover:text-amber-800"
					>
						Patronos
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
						href="/comenda"
						className="font-medium text-gray-700 transition-colors hover:text-amber-800"
					>
						Comenda Breno Accioly
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
			</Drawer>
		</header>
	);
});
