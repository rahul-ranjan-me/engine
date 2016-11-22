define([
		"angular", 
		"ngRoute",
		"adalProvider",
		"jquery",

		// Properties
		'properties',

		// Controllers

		"controllers/loginAD",
		"controllers/sales",
		"controllers/byClients",
		"controllers/clientDetails",
		"controllers/summary.js",

		// Directives

		"directives/header",
		
		"components/grid/grid",
		"components/metaForm/metaForm",
		"directives/datepicker",
		"directives/columnChooser",
		"directives/typeahead",
		"directives/compileTemplate",
		"directives/likeDislike",
		"directives/note",

		// Services

		"services/httpCalls.js",

		//Factories

		"factory/xhr.js",
		"factory/popupUtils.js",
		"factory/selectedData.js",
		"factory/userService.js",
		"factory/commonUtils.js",
		"factory/chartFactory.js",

		// Templates

		"text!../templates/loginAD.html",
		"text!../templates/sales.html",
		"text!../templates/byClients.html",
		"text!../templates/clientDetails.html",
		"text!../templates/summary.html"
	], 
	function(
		angular,
		ngRoute,
		adalProvider,
		$,

		//Properties
		properties,

		// Controllers
		loginAD,
		sales,
		byClients,
		clientDetails,
		summary,

		// Directives

		header,
		
		grid,
		metaForm,
		datepicker,
		columnChooser,
		typeahead,
		compileTemplate,
		likeDislike,
		note,

		// Services

		httpCalls,

		// Factory

		xhr,
		popupUtils,
		selectedData,
		userService,
		commonUtils,
		chartFactory,

		// Templates
		loginADTMPL,
		salesTMPL,
		byClientsTMPL,
		clientDetailsTMPL,
		summaryTMPL
	
	) {

	    var app = angular.module("projectModule", ["ngRoute", "AdalAngular"] )
	    	
	    	// Controllers
			
			.controller('loginAD', loginAD)
	    	.controller('sales', sales)
	    	.controller('byClients', byClients)
			.controller('clientDetails', clientDetails)
			.controller('summary', summary)

			// Directives

	    	.directive('headerDirective', header)
	    	.directive('grid', grid)
	    	.directive('metaForm', metaForm)
	    	.directive('datepicker', datepicker)
	    	.directive('columnChooser', columnChooser)
			.directive('typeahead', typeahead)
			.directive('likeDislike', likeDislike)
			.directive('compileTemplate', compileTemplate)
			.directive('note', note)

			// Services

			.service('httpCalls', httpCalls)

			// Factory
			
			.factory('xhr', xhr)
			.factory('popupUtils', popupUtils)
			.factory('selectedData', selectedData)
			.factory('userService', userService)
			.factory('commonUtils', commonUtils)
			.factory('chartFactory', chartFactory)

			.config(['$routeProvider','$httpProvider', 'adalAuthenticationServiceProvider', 
				function($routeProvider, $httpProvider, adalProvider) {
			
				$routeProvider.
					when('/', {
						template: loginADTMPL,
						controller: 'loginAD'
					}).
					when('/Summary', {
						template: summaryTMPL,
						controller: 'summary',
						requireADLogin: true
					}).
					when('/Dashboard', {
						template: salesTMPL,
						controller: 'sales',
						requireADLogin: true
					}).
					// when('/login', {
					// 	template: loginTMPL,
					// 	controller: 'login'
					// }).
					when('/RecommendationsByClients', {
						template: byClientsTMPL,
						controller: 'byClients',
						requireADLogin: true
					}).
					when('/ClientDetails/:clientId', {
						template: clientDetailsTMPL,
						controller: 'clientDetails',
						requireADLogin: true
					}).
					when('/loginAD', {
						template: loginADTMPL,
						controller: 'loginAD'
					}).
					otherwise({
						redirectTo: '/Summary'
					});

					var endpoints = {
						"/RecommendsService/" : "http://markit.onmicrosoft.com/RecommendsService"
					};

					adalProvider.init({
							instance:'https://login.microsoftonline.com/',
							tenant : properties.context.tenant,
							clientId:'0fdf1e5a-c7bc-4f82-8285-5845407eeb7a',
							endpoints: endpoints,
							postLogoutRedirectUri: properties.context.DomainURL+'#/loginAD',
							redirectUri: properties.context.redirectUri
							//cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
						},$httpProvider
					);

			}]);

		

	    app.init = function () {
	    	angular.bootstrap(document, ['projectModule']);
		};

	    return app;
	}
);