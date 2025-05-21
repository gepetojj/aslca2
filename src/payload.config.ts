import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { searchPlugin } from "@payloadcms/plugin-search";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { pt } from "@payloadcms/translations/languages/pt";

import { Academics } from "./collections/academics";
import { BlogPosts } from "./collections/blog-posts";
import { Commendations } from "./collections/commendations";
import { Events } from "./collections/events";
import { Media } from "./collections/media";
import { News } from "./collections/news";
import { Patrons } from "./collections/patrons";
import { Users } from "./collections/users";
import { Citation } from "./globals/citation";
import { Gallery } from "./globals/gallery";

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
	collections: [Users, Media, Patrons, Academics, News, BlogPosts, Events, Commendations],
	globals: [Citation, Gallery],
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL || "",
		},
	}),
	editor: lexicalEditor(),
	i18n: {
		supportedLanguages: { pt },
	},
	plugins: [
		payloadCloudPlugin(),
		s3Storage({
			collections: {
				"media": true,
				"blog-posts": true,
				"news": true,
			},
			bucket: process.env.S3_BUCKET || "",
			config: {
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY || "",
					secretAccessKey: process.env.S3_SECRET_KEY || "",
				},
				region: process.env.S3_REGION || "",
			},
			enabled: process.env.NODE_ENV === "production",
			// enabled: true,
		}),
		searchPlugin({
			collections: ["blog-posts", "news", "academics", "patrons", "commendations", "events"],
			defaultPriorities: {
				"blog-posts": 20,
				"news": 20,
				"academics": 10,
				"patrons": 10,
				"commendations": 10,
				"events": 10,
			},
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
