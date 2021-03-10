const async = require("async");

module.exports = function(req, res, next) {
	async.parallel([
		function(callback) {
			Stack.ContentType("settings").Query()
				.toJSON()
				.includeReference([
					"global_banner.dialog",
					
					// Theme
					"ecommerce_settings.theme",

					// Menu
					"ecommerce_settings.menu.menu_section.section_link",
					"ecommerce_settings.menu.menu_section.column.group.section_link",
					"ecommerce_settings.menu.menu_section.column.group.menu_item.section_link"
				])
				.find()
				.spread(function success(result) {
					const settings = result[0];

					let site_mode_settings = settings.ecommerce_settings;

					settings.theme = site_mode_settings.theme[0];
					settings.menu = map_menu(site_mode_settings.menu[0]);
					settings.site_title = site_mode_settings.site_title;
					settings.site_logo = site_mode_settings.site_logo;
					
					delete settings.ecommerce_settings;

					if (settings.global_banner.dialog && settings.global_banner.dialog.length) {
						settings.global_banner.dialog = settings.global_banner.dialog[0];
					}

					if (settings) {
						callback(null, settings);
					} else {
						throw new Error("Failed to load site settings and theme.");
					}
				}, function error(settingsError) {
					callback(settingsError);
				});
		},
		function(callback) {
			Stack.ContentType("a_b_tests").Query()
				.toJSON()
				.find()
				.spread(function success(result) {
					const tests = result[0];
				
					if (tests) {
						callback(null, tests);
					} else {
						throw new Error("Failed to load A/B Test Settings.");
					}
				}, function error(abTestError) {
					callback(abTestError);
				});
		},
	], function(error, success) {
		if (error) return next(error);

		const settings = success[0];
		const abTests = success[1];

		res.locals.settings = settings;
		res.locals.abTests = abTests;

		next();
	});
};

function map_menu(menu) {
	for (const section of menu.menu_section) {
		section.href = href(section);
		section.hasColumns = section.column && section.column.length;

		for (const column of section.column) {
			if (column.group && column.group.length > 0) {
				for (const group of column.group) {
					group.href = href(group);
					group.hasMenuItems = group.menu_item && group.menu_item.length > 0;
				}
			}
		}
	}

	return menu;
}

function href(item) {
	if (item.section_link && item.section_link.length) {
		return item.section_link[0].relative_url;
	} else {
		return item.custom_link;
	}
}