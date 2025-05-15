"use client";

import { useState } from "react";

import { IconCheck, IconCopy, IconShare } from "@tabler/icons-react";

interface ShareButtonProps {
	title: string;
	url: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title,
					url,
				});
			} catch (error) {
				console.error("Compartilhamento cancelado ou falhou:", error);
			}
		} else {
			try {
				await navigator.clipboard.writeText(url);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (error) {
				console.error("Não foi possível copiar o link:", error);
			}
		}
	};

	return (
		<button
			onClick={handleShare}
			className="flex cursor-pointer items-center gap-2 rounded bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
			aria-label="Compartilhar"
		>
			{copied ? (
				<>
					<IconCheck size={16} />
					Link copiado!
				</>
			) : (
				<>
					{!!navigator.share ? <IconShare size={16} /> : <IconCopy size={16} />}
					Compartilhar
				</>
			)}
		</button>
	);
}
