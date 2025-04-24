import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { pt } from "@payloadcms/translations/languages/pt";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		dateFormat: "dd/MM/yyyy 'às' HH:mm",
		importMap: {
			baseDir: path.resolve(dirname),
		},
		meta: {
			title: "Administração - ASLCA",
		},
		timezones: {
			defaultTimezone: "America/Sao_Paulo",
		},
		user: Users.slug,
	},
	collections: [Users, Media],
	db: vercelPostgresAdapter(),
	editor: lexicalEditor(),
	i18n: {
		supportedLanguages: { pt },
	},
	plugins: [
		payloadCloudPlugin(),
		vercelBlobStorage({
			collections: {
				media: true,
			},
			enabled: process.env.NODE_ENV === "production",
			token: process.env.BLOB_READ_WRITE_TOKEN,
		}),
	],
	secret: process.env.PAYLOAD_SECRET || "",
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	upload: {
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB
		},
		preserveExtension: true,
		safeFileNames: true,
	},
});
