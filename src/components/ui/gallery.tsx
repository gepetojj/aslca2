"use client";

import clsx from "clsx";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";

type Props = {
	images: { src: string; alt: string; width: number; height: number }[];
	autoRotateInterval?: number;
	showControls?: boolean;
	showIndicators?: boolean;
	aspectRatio?: string;
	maxHeight?: string;
};

export const Gallery: React.FC<Props> = memo(function Gallery({
	images,
	autoRotateInterval = 5000,
	showControls = true,
	showIndicators = true,
	aspectRatio = "16/9",
	maxHeight = "400px",
}) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	// Navigation functions
	const nextSlide = useCallback(() => {
		setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
	}, [images.length]);

	const prevSlide = useCallback(() => {
		setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));
	}, [images.length]);

	const goToSlide = useCallback((index: number) => {
		setCurrentSlide(index);
	}, []);

	useEffect(() => {
		if (isPaused || autoRotateInterval <= 0 || images.length <= 1) return;

		const timer = setInterval(() => {
			nextSlide();
		}, autoRotateInterval);

		return () => clearInterval(timer);
	}, [nextSlide, isPaused, autoRotateInterval, images.length]);

	const handleMouseEnter = useCallback(() => {
		setIsPaused(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsPaused(false);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				prevSlide();
			} else if (e.key === "ArrowRight") {
				nextSlide();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [nextSlide, prevSlide]);

	if (!images || images.length === 0) {
		return (
			<div className="flex h-full w-full items-center justify-center bg-gray-200">Nenhuma imagem disponível</div>
		);
	}

	return (
		<div className="w-full">
			<div
				className="relative h-full w-full overflow-hidden rounded-lg shadow-md"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{
					aspectRatio: aspectRatio,
					maxHeight: maxHeight,
				}}
			>
				{images.map((image, index) => (
					<div
						key={index}
						className={`absolute inset-0 transition-opacity duration-1000 ${
							index === currentSlide ? "opacity-100" : "opacity-0"
						}`}
						aria-hidden={index !== currentSlide}
					>
						{image.width && image.height ? (
							<Image
								src={image.src}
								alt={image.alt || ""}
								width={image.width}
								height={image.height}
								priority={index === 0}
								loading={index === 0 ? "eager" : "lazy"}
								className="h-full w-full object-cover"
							/>
						) : (
							<img
								src={image.src}
								alt={image.alt || ""}
								className="h-full w-full object-cover"
							/>
						)}
					</div>
				))}

				{/* Navigation arrows */}
				{showControls && images.length > 1 && (
					<>
						<button
							onClick={prevSlide}
							className="absolute top-1/2 left-4 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
							aria-label="Imagem anterior"
						>
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
								<polyline points="15 18 9 12 15 6"></polyline>
							</svg>
						</button>
						<button
							onClick={nextSlide}
							className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
							aria-label="Próxima imagem"
						>
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
								<polyline points="9 18 15 12 9 6"></polyline>
							</svg>
						</button>
					</>
				)}

				{/* Indicators */}
				{showIndicators && images.length > 1 && (
					<div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 space-x-2">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`h-3 w-3 rounded-full transition-colors ${
									index === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
								}`}
								aria-label={`Ir para a imagem ${index + 1}`}
								aria-current={index === currentSlide ? "true" : "false"}
							/>
						))}
					</div>
				)}

				{/* Image counter */}
				<div className="absolute top-4 right-4 z-30 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
					{currentSlide + 1}/{images.length}
				</div>
			</div>

			<div className="w-full max-w-full truncate">
				<span className="mt-1 w-full max-w-full truncate text-sm text-neutral-800">
					{images[currentSlide].alt}
				</span>
			</div>
		</div>
	);
});
