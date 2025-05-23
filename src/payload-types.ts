/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
	| "Pacific/Midway"
	| "Pacific/Niue"
	| "Pacific/Honolulu"
	| "Pacific/Rarotonga"
	| "America/Anchorage"
	| "Pacific/Gambier"
	| "America/Los_Angeles"
	| "America/Tijuana"
	| "America/Denver"
	| "America/Phoenix"
	| "America/Chicago"
	| "America/Guatemala"
	| "America/New_York"
	| "America/Bogota"
	| "America/Caracas"
	| "America/Santiago"
	| "America/Buenos_Aires"
	| "America/Sao_Paulo"
	| "Atlantic/South_Georgia"
	| "Atlantic/Azores"
	| "Atlantic/Cape_Verde"
	| "Europe/London"
	| "Europe/Berlin"
	| "Africa/Lagos"
	| "Europe/Athens"
	| "Africa/Cairo"
	| "Europe/Moscow"
	| "Asia/Riyadh"
	| "Asia/Dubai"
	| "Asia/Baku"
	| "Asia/Karachi"
	| "Asia/Tashkent"
	| "Asia/Calcutta"
	| "Asia/Dhaka"
	| "Asia/Almaty"
	| "Asia/Jakarta"
	| "Asia/Bangkok"
	| "Asia/Shanghai"
	| "Asia/Singapore"
	| "Asia/Tokyo"
	| "Asia/Seoul"
	| "Australia/Brisbane"
	| "Australia/Sydney"
	| "Pacific/Guam"
	| "Pacific/Noumea"
	| "Pacific/Auckland"
	| "Pacific/Fiji";

export interface Config {
	auth: {
		users: UserAuthOperations;
	};
	blocks: {};
	collections: {
		"users": User;
		"media": Media;
		"patrons": Patron;
		"academics": Academic;
		"news": News;
		"blog-posts": BlogPost;
		"events": Event;
		"commendations": Commendation;
		"search": Search;
		"payload-jobs": PayloadJob;
		"payload-locked-documents": PayloadLockedDocument;
		"payload-preferences": PayloadPreference;
		"payload-migrations": PayloadMigration;
	};
	collectionsJoins: {
		users: {
			academic: "academics";
		};
		academics: {
			patron: "patrons";
		};
	};
	collectionsSelect: {
		"users": UsersSelect<false> | UsersSelect<true>;
		"media": MediaSelect<false> | MediaSelect<true>;
		"patrons": PatronsSelect<false> | PatronsSelect<true>;
		"academics": AcademicsSelect<false> | AcademicsSelect<true>;
		"news": NewsSelect<false> | NewsSelect<true>;
		"blog-posts": BlogPostsSelect<false> | BlogPostsSelect<true>;
		"events": EventsSelect<false> | EventsSelect<true>;
		"commendations": CommendationsSelect<false> | CommendationsSelect<true>;
		"search": SearchSelect<false> | SearchSelect<true>;
		"payload-jobs": PayloadJobsSelect<false> | PayloadJobsSelect<true>;
		"payload-locked-documents": PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
		"payload-preferences": PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
		"payload-migrations": PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
	};
	db: {
		defaultIDType: number;
	};
	globals: {
		citation: Citation;
		gallery: Gallery;
	};
	globalsSelect: {
		citation: CitationSelect<false> | CitationSelect<true>;
		gallery: GallerySelect<false> | GallerySelect<true>;
	};
	locale: null;
	user: User & {
		collection: "users";
	};
	jobs: {
		tasks: {
			schedulePublish: TaskSchedulePublish;
			inline: {
				input: unknown;
				output: unknown;
			};
		};
		workflows: unknown;
	};
}
export interface UserAuthOperations {
	forgotPassword: {
		email: string;
		password: string;
	};
	login: {
		email: string;
		password: string;
	};
	registerFirstUser: {
		email: string;
		password: string;
	};
	unlock: {
		email: string;
		password: string;
	};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
	id: number;
	name: string;
	role: "user" | "admin";
	academic?: {
		docs?: (number | Academic)[];
		hasNextPage?: boolean;
		totalDocs?: number;
	};
	updatedAt: string;
	createdAt: string;
	email: string;
	resetPasswordToken?: string | null;
	resetPasswordExpiration?: string | null;
	salt?: string | null;
	hash?: string | null;
	loginAttempts?: number | null;
	lockUntil?: string | null;
	password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "academics".
 */
export interface Academic {
	id: number;
	name: string;
	type: "active" | "benemeritus" | "honorary" | "correspondent" | "inMemoriam";
	patron?: {
		docs?: (number | Patron)[];
		hasNextPage?: boolean;
		totalDocs?: number;
	};
	user?: (number | null) | User;
	image: number | Media;
	biography: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	};
	updatedAt: string;
	createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "patrons".
 */
export interface Patron {
	id: number;
	name: string;
	chair: number;
	academic?: (number | null) | Academic;
	image: number | Media;
	biography: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	};
	updatedAt: string;
	createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
	id: number;
	alt: string;
	updatedAt: string;
	createdAt: string;
	url?: string | null;
	thumbnailURL?: string | null;
	filename?: string | null;
	mimeType?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	focalX?: number | null;
	focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news".
 */
export interface News {
	id: number;
	title: string;
	/**
	 * Deixe em branco para gerar automaticamente a partir do título
	 */
	slug?: string | null;
	description: string;
	author?: (number | null) | User;
	content: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	};
	updatedAt: string;
	createdAt: string;
	_status?: ("draft" | "published") | null;
	url?: string | null;
	thumbnailURL?: string | null;
	filename?: string | null;
	mimeType?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	focalX?: number | null;
	focalY?: number | null;
	sizes?: {
		small?: {
			url?: string | null;
			width?: number | null;
			height?: number | null;
			mimeType?: string | null;
			filesize?: number | null;
			filename?: string | null;
		};
		large?: {
			url?: string | null;
			width?: number | null;
			height?: number | null;
			mimeType?: string | null;
			filesize?: number | null;
			filename?: string | null;
		};
	};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blog-posts".
 */
export interface BlogPost {
	id: number;
	title: string;
	/**
	 * Deixe em branco para gerar automaticamente a partir do título
	 */
	slug?: string | null;
	description: string;
	author?: (number | null) | User;
	content: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	};
	updatedAt: string;
	createdAt: string;
	_status?: ("draft" | "published") | null;
	url?: string | null;
	thumbnailURL?: string | null;
	filename?: string | null;
	mimeType?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	focalX?: number | null;
	focalY?: number | null;
	sizes?: {
		small?: {
			url?: string | null;
			width?: number | null;
			height?: number | null;
			mimeType?: string | null;
			filesize?: number | null;
			filename?: string | null;
		};
		large?: {
			url?: string | null;
			width?: number | null;
			height?: number | null;
			mimeType?: string | null;
			filesize?: number | null;
			filename?: string | null;
		};
	};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
	id: number;
	title: string;
	description?: string | null;
	location: string;
	date: string;
	updatedAt: string;
	createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "commendations".
 */
export interface Commendation {
	id: number;
	name: string;
	type: "civil" | "literary" | "artistic" | "scientific";
	image: number | Media;
	biography: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	};
	updatedAt: string;
	createdAt: string;
}
/**
 * This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
	id: number;
	title?: string | null;
	priority?: number | null;
	doc:
		| {
				relationTo: "blog-posts";
				value: number | BlogPost;
		  }
		| {
				relationTo: "news";
				value: number | News;
		  }
		| {
				relationTo: "academics";
				value: number | Academic;
		  }
		| {
				relationTo: "patrons";
				value: number | Patron;
		  }
		| {
				relationTo: "commendations";
				value: number | Commendation;
		  }
		| {
				relationTo: "events";
				value: number | Event;
		  };
	updatedAt: string;
	createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-jobs".
 */
export interface PayloadJob {
	id: number;
	/**
	 * Input data provided to the job
	 */
	input?:
		| {
				[k: string]: unknown;
		  }
		| unknown[]
		| string
		| number
		| boolean
		| null;
	taskStatus?:
		| {
				[k: string]: unknown;
		  }
		| unknown[]
		| string
		| number
		| boolean
		| null;
	completedAt?: string | null;
	totalTried?: number | null;
	/**
	 * If hasError is true this job will not be retried
	 */
	hasError?: boolean | null;
	/**
	 * If hasError is true, this is the error that caused it
	 */
	error?:
		| {
				[k: string]: unknown;
		  }
		| unknown[]
		| string
		| number
		| boolean
		| null;
	/**
	 * Task execution log
	 */
	log?:
		| {
				executedAt: string;
				completedAt: string;
				taskSlug: "inline" | "schedulePublish";
				taskID: string;
				input?:
					| {
							[k: string]: unknown;
					  }
					| unknown[]
					| string
					| number
					| boolean
					| null;
				output?:
					| {
							[k: string]: unknown;
					  }
					| unknown[]
					| string
					| number
					| boolean
					| null;
				state: "failed" | "succeeded";
				error?:
					| {
							[k: string]: unknown;
					  }
					| unknown[]
					| string
					| number
					| boolean
					| null;
				id?: string | null;
		  }[]
		| null;
	taskSlug?: ("inline" | "schedulePublish") | null;
	queue?: string | null;
	waitUntil?: string | null;
	processing?: boolean | null;
	updatedAt: string;
	createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
	id: number;
	document?:
		| ({
				relationTo: "users";
				value: number | User;
		  } | null)
		| ({
				relationTo: "media";
				value: number | Media;
		  } | null)
		| ({
				relationTo: "patrons";
				value: number | Patron;
		  } | null)
		| ({
				relationTo: "academics";
				value: number | Academic;
		  } | null)
		| ({
				relationTo: "news";
				value: number | News;
		  } | null)
		| ({
				relationTo: "blog-posts";
				value: number | BlogPost;
		  } | null)
		| ({
				relationTo: "events";
				value: number | Event;
		  } | null)
		| ({
				relationTo: "commendations";
				value: number | Commendation;
		  } | null)
		| ({
				relationTo: "search";
				value: number | Search;
		  } | null)
		| ({
				relationTo: "payload-jobs";
				value: number | PayloadJob;
		  } | null);
	globalSlug?: string | null;
	user: {
		relationTo: "users";
		value: number | User;
	};
	updatedAt: string;
	createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
	id: number;
	user: {
		relationTo: "users";
		value: number | User;
	};
	key?: string | null;
	value?:
		| {
				[k: string]: unknown;
		  }
		| unknown[]
		| string
		| number
		| boolean
		| null;
	updatedAt: string;
	createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
	id: number;
	name?: string | null;
	batch?: number | null;
	updatedAt: string;
	createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
	name?: T;
	role?: T;
	academic?: T;
	updatedAt?: T;
	createdAt?: T;
	email?: T;
	resetPasswordToken?: T;
	resetPasswordExpiration?: T;
	salt?: T;
	hash?: T;
	loginAttempts?: T;
	lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
	alt?: T;
	updatedAt?: T;
	createdAt?: T;
	url?: T;
	thumbnailURL?: T;
	filename?: T;
	mimeType?: T;
	filesize?: T;
	width?: T;
	height?: T;
	focalX?: T;
	focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "patrons_select".
 */
export interface PatronsSelect<T extends boolean = true> {
	name?: T;
	chair?: T;
	academic?: T;
	image?: T;
	biography?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "academics_select".
 */
export interface AcademicsSelect<T extends boolean = true> {
	name?: T;
	type?: T;
	patron?: T;
	user?: T;
	image?: T;
	biography?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news_select".
 */
export interface NewsSelect<T extends boolean = true> {
	title?: T;
	slug?: T;
	description?: T;
	author?: T;
	content?: T;
	updatedAt?: T;
	createdAt?: T;
	_status?: T;
	url?: T;
	thumbnailURL?: T;
	filename?: T;
	mimeType?: T;
	filesize?: T;
	width?: T;
	height?: T;
	focalX?: T;
	focalY?: T;
	sizes?:
		| T
		| {
				small?:
					| T
					| {
							url?: T;
							width?: T;
							height?: T;
							mimeType?: T;
							filesize?: T;
							filename?: T;
					  };
				large?:
					| T
					| {
							url?: T;
							width?: T;
							height?: T;
							mimeType?: T;
							filesize?: T;
							filename?: T;
					  };
		  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blog-posts_select".
 */
export interface BlogPostsSelect<T extends boolean = true> {
	title?: T;
	slug?: T;
	description?: T;
	author?: T;
	content?: T;
	updatedAt?: T;
	createdAt?: T;
	_status?: T;
	url?: T;
	thumbnailURL?: T;
	filename?: T;
	mimeType?: T;
	filesize?: T;
	width?: T;
	height?: T;
	focalX?: T;
	focalY?: T;
	sizes?:
		| T
		| {
				small?:
					| T
					| {
							url?: T;
							width?: T;
							height?: T;
							mimeType?: T;
							filesize?: T;
							filename?: T;
					  };
				large?:
					| T
					| {
							url?: T;
							width?: T;
							height?: T;
							mimeType?: T;
							filesize?: T;
							filename?: T;
					  };
		  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
	title?: T;
	description?: T;
	location?: T;
	date?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "commendations_select".
 */
export interface CommendationsSelect<T extends boolean = true> {
	name?: T;
	type?: T;
	image?: T;
	biography?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search_select".
 */
export interface SearchSelect<T extends boolean = true> {
	title?: T;
	priority?: T;
	doc?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-jobs_select".
 */
export interface PayloadJobsSelect<T extends boolean = true> {
	input?: T;
	taskStatus?: T;
	completedAt?: T;
	totalTried?: T;
	hasError?: T;
	error?: T;
	log?:
		| T
		| {
				executedAt?: T;
				completedAt?: T;
				taskSlug?: T;
				taskID?: T;
				input?: T;
				output?: T;
				state?: T;
				error?: T;
				id?: T;
		  };
	taskSlug?: T;
	queue?: T;
	waitUntil?: T;
	processing?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
	document?: T;
	globalSlug?: T;
	user?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
	user?: T;
	key?: T;
	value?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
	name?: T;
	batch?: T;
	updatedAt?: T;
	createdAt?: T;
}
/**
 * Citação que aparece na página inicial.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "citation".
 */
export interface Citation {
	id: number;
	author: string;
	text: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	};
	updatedAt?: string | null;
	createdAt?: string | null;
}
/**
 * Imagens que aparecem na tela inicial.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery".
 */
export interface Gallery {
	id: number;
	images: (number | Media)[];
	updatedAt?: string | null;
	createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "citation_select".
 */
export interface CitationSelect<T extends boolean = true> {
	author?: T;
	text?: T;
	updatedAt?: T;
	createdAt?: T;
	globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery_select".
 */
export interface GallerySelect<T extends boolean = true> {
	images?: T;
	updatedAt?: T;
	createdAt?: T;
	globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TaskSchedulePublish".
 */
export interface TaskSchedulePublish {
	input: {
		type?: ("publish" | "unpublish") | null;
		locale?: string | null;
		doc?:
			| ({
					relationTo: "news";
					value: number | News;
			  } | null)
			| ({
					relationTo: "blog-posts";
					value: number | BlogPost;
			  } | null);
		global?: string | null;
		user?: (number | null) | User;
	};
	output?: unknown;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
	[k: string]: unknown;
}

declare module "payload" {
	export interface GeneratedTypes extends Config {}
}
