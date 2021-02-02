const express = require("express"),
	nunjucks = require("nunjucks"),
	bodyParser = require("body-parser"),
	path = require("path"),
	cookieParser = require("cookie-parser"),
	morgan = require("morgan"),
	helmet = require("helmet");


let env = process.env.NODE_ENV || "default",
	_dirname = (process.env.SITE_PATH) ? path.resolve(process.env.SITE_PATH) : process.cwd(),
	_env;

global["env"] = env;

try {
	// load environment based configurations
	let _path = path.join(_dirname, "config");

	_env = require(path.join(_path, env));

	// load globals
	global["config"] = _env;
	console.log("env", _env.contentstack);
	global["Stack"] = require("./lib/stack-initialize")(_env.contentstack);
	global["logger"] = require("./lib/logger.js");

	var app = express();
	app.enable("trust proxy");

	// Client side pages to fall under ~/views directory
	app.set("views", path.join(__dirname, "views"));

	// Setting Nunjucks as default view
	const njEnv = nunjucks.configure("views", {
		autoescape: true,
		express: app
	});

	njEnv.addGlobal("Date", Date);

	app.set("view engine", "html");
	app.disable("x-powered-by");

	app.use(morgan(":remote-addr - :remote-user \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\"", {
		"stream": logger.stream
	}));

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(helmet());
	app.use(bodyParser.json());
	app.use(express.static(path.join(__dirname, "public")));
 
	app.use(cookieParser());

	require("./routes")(app, express());

	app.use((req, res) => { 
		res.locals.isErrorPage = true;
		return res.status(404).render("pages/errors/404");
	});

	app.use((err, req, res, next) => { console.log(err);
		if (res.headersSent) {
			return next(err)
		}

		logger.error(err);
		res.locals.isErrorPage = true;
		res.status(500).render("pages/errors/500", { message: err.message });
	});
}
catch (err) { 
	console.log(err);
	logger.error(err.message);
}

module.exports = app;