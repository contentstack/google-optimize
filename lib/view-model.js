function ViewModel(req, res, content, contentType, extras = {}) {
	const json = JSON.stringify(content);
	const abTests = JSON.stringify(res.locals.abTests);
	console.log({abTests})
	const csEditButton = {
		pageUid: content.uid,
		contentType
	}

	return {
		data: content,
		json,
		abTests,
		csEditButton,
		trackingId: config.analytics.trackingId,
		optimizeId: config.analytics.optimizeId,
		...extras
	}
}

module.exports.ViewModel = ViewModel;