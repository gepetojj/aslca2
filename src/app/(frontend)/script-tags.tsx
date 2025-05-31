export default function JsonLd({ jsonLd }: { jsonLd: string | string[] }) {
	if (Array.isArray(jsonLd)) {
		return (
			<>
				{jsonLd.map((json, index) => (
					<script
						key={index}
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: json }}
					/>
				))}
			</>
		);
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: jsonLd }}
		/>
	);
}
