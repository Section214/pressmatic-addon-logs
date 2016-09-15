'use strict';

var path = require('path');

module.exports = function (context) {

	var hooks = context.hooks;
	var React = context.React;
	var Route = context.ReactRouter.Route;


	var SiteInfoLogs = require('./SiteInfoLogs')(context);

	hooks.addContent('routesSiteInfo', function () {
		return React.createElement(Route, { key: 'site-info-logs', path: '/site-info/:siteID/logs', component: SiteInfoLogs });
	});

	hooks.addFilter('siteInfoMoreMenu', function (menu, site) {

		menu.push({
			label: 'Logs',
			enabled: !this.context.router.isActive('/site-info/' + site.id + '/logs'),
			click: function click() {
				context.events.send('goToRoute', '/site-info/' + site.id + '/logs');
			}
		});

		return menu;
	});
};
