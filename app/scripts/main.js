require.config({
	waitSeconds : 30,
	paths: {
		'angular' : '../../node_modules/angular/angular',
		'jquery' : '../../node_modules/jquery/dist/jquery',
		'text' : '../../node_modules/text/text',
		'lodash' : '../../node_modules/lodash/lodash',
		'css' : '../../node_modules/require-css/css',
		'css-builder' : '../../node_modules/require-css/css-builder',
		'normalize' : '../../node_modules/require-css/normalize',
		'ngRoute' : '../../node_modules/angular-route/angular-route',
		'adal': "libs/adal",
		'adalProvider': "libs/adal-angular"
	},
	shim: {
		ngRoute: {
			deps: ['angular'],
			exports: 'angular'
		},
		angular: {
			exports : 'angular'
		},
		jquery: {
			exports : '$'
		},
		highcharts: {
			exports: "Highcharts",
			deps: ["jquery"]
	    },
	    adalProvider : {
	    	exports: "adalProvider",
			deps: ["angular", "adal"]
	    }
	},
	baseUrl: '/scripts'
});

require(['app', 'libs/highcharts'], function (app, highcharts) {
	app.init();
});