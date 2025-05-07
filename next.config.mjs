import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
	webpack: config => {
		config.resolve.alias.canvas = false;
		return config;
	},
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
