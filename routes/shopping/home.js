const express = require("express");
const { ViewModel } = require("../../lib/view-model");

const router = express.Router();
router.get("/", home);

async function home(req, res, next) {
	try {
		
		const contentType = "homepage_personalised";
		let homeQuery = Stack.ContentType(contentType).Query()
			.toJSON()
			.includeCount()
			.includeReference("new_arrivals.products")
			.find();

		let queryResults = await Promise.all([homeQuery]);
		let content = queryResults[0][0][0];
			console.log({content})
		if (!content)
			return next({
				message: `Please ensure an entry was created for ${contentType}.`
			});

		
		return res.render("pages/home/index", 
			ViewModel(req, res, content, contentType));
	} catch (e) {
		next(e);
	}
}

module.exports = router;
