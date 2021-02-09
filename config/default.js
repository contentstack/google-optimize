module.exports = exports = {
	port: 4000,
	contentstack: {
		api_key: process.env.API_KEY,
		delivery_token: process.env.DELIVERY_TOKEN,
		environment: process.env.ENVIRONMENT,
		region: process.env.REGION
	},
	analytics: {
		trackingId: process.env.TRACKING_ID,
		optimizeId: process.env.OPTIMIZE_ID
	},
	log: {
		"path": "_log/dev.log"
	}
}; 