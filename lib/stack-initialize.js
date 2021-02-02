const Contentstack = require("contentstack");

function contentstack(env) {
	return Contentstack.Stack(env);
}

module.exports = contentstack;
