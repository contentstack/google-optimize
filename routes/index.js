module.exports = (app) => {
	app.use("/", require("../middlewares"));

	app.use(["/:locale", "/"], require("./shopping/home"));
};