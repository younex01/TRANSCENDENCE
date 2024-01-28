const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
				{
					protocol: 'https',
					hostname: "cdn.intra.42.fr",
					
				},
				
        ],
    },
};




module.exports = nextConfig