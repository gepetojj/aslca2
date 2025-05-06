import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { IconBrandInstagram, IconClock, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";

export const metadata = {
	title: "Contato | Academia Santanense de Letras, Ciências e Artes",
	description: "Entre em contato com a Academia Santanense de Letras, Ciências e Artes",
};

export default async function Page() {
	return (
		<div className="min-h-screen bg-slate-50 font-serif text-gray-800">
			<Header />

			<main>
				<section className="relative bg-gray-200 py-20">
					<div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-800/70 to-amber-400/40"></div>
					<div className="relative z-20 container mx-auto px-4 text-center">
						<h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">Contato</h1>
						<p className="mx-auto max-w-2xl text-lg text-white">
							Entre em contato conosco para mais informações sobre a Academia Santanense de Letras,
							Ciências e Artes
						</p>
					</div>
				</section>

				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="rounded-lg bg-white p-8">
							<div className="mb-10">
								<h2 className="mb-6 flex items-center font-serif text-2xl font-bold text-gray-800">
									<IconMapPin
										size={30}
										className="mr-3 text-amber-800"
									/>
									Endereço
								</h2>
								<p className="text-lg text-gray-700">
									Rua Coronel Lucena, 196, Centro - Casa da Cultura de Santana do Ipanema,
									<br />
									57500-000 - Santana do Ipanema/AL
								</p>
							</div>

							<div className="mb-10">
								<h2 className="mb-6 flex items-center font-serif text-2xl font-bold text-gray-800">
									<IconClock
										size={30}
										className="mr-3 text-amber-800"
									/>
									Horário de funcionamento
								</h2>
								<p className="text-lg text-gray-700">2ª a 6ª-feiras, de 9:00h às 13:00h</p>
							</div>

							<div className="mb-10">
								<h2 className="mb-6 flex items-center font-serif text-2xl font-bold text-gray-800">
									<IconPhone
										size={30}
										className="mr-3 text-amber-800"
									/>
									Telefone
								</h2>
								<p className="text-lg text-gray-700">(82) 99928-2412</p>
							</div>

							<div className="mb-10">
								<h2 className="mb-6 flex items-center font-serif text-2xl font-bold text-gray-800">
									<IconBrandInstagram
										size={30}
										className="mr-3 text-amber-800"
									/>
									Instagram
								</h2>
								<a
									href="https://www.instagram.com/asclasi"
									target="_blank"
									rel="noopener noreferrer"
									className="text-lg text-amber-800 hover:text-amber-900 hover:underline"
								>
									@asclasi
								</a>
							</div>

							<div className="mb-6">
								<h2 className="mb-6 flex items-center font-serif text-2xl font-bold text-gray-800">
									<IconMail
										size={30}
										className="mr-3 text-amber-800"
									/>
									Correio eletrônico
								</h2>
								<ul className="space-y-4">
									<li>
										<p className="mb-1 font-medium text-gray-800">Presidente:</p>
										<a
											href="mailto:maltafneto@gmail.com"
											className="text-lg text-amber-800 hover:text-amber-900 hover:underline"
										>
											maltafneto@gmail.com
										</a>
									</li>
									<li>
										<p className="mb-1 font-medium text-gray-800">Administrador:</p>
										<a
											href="mailto:aslca.contato@gmail.com"
											className="text-lg text-amber-800 hover:text-amber-900 hover:underline"
										>
											aslca.contato@gmail.com
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
