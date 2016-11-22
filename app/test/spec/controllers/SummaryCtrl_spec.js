define([

	'angular',
	'lodash',
	'jquery',
	'controllers/summary', 
	'properties',
	'angularMocks'
], 
function(
	angular,
	_,
	$,
	summaryCtrl,
	properties
) {

	describe('Summary Controller Test', function(){
		var scope, ctrl, httpCalls, chartFactory, httpBackend;

		beforeEach(inject(function($controller, $rootScope, $timeout, $window, $sce, $httpBackend) {
			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			timeout = $timeout;
			httpCalls = {
				getRecommendationType : function(params, headers, callback){
					callback({"Fund Admins":185,"Sell-Side":2709});
				},
				getRecommendationRegion : function(params, headers, callback){
					callback({"Russian Federation":12,"Singapore":173});
				},
				getRecommendationTop : function(params, headers, callback){
					callback([{"clientName":"Skandinaviska Enskilda Banken AB"},{"clientName":"Mufg Union Bank, N.a"}]);
				},
				getRecommendationProducts : function(params, headers, callback){
					callback({"Securities Finance":9,"DSMatch":26});
				},
				getRecommendationProductDetails : function(params, headers, callback){
					callback({
						newBusinessTrend: {
							'2015' : 262,
							'2016' : 235
						},
						renewalTrend: {
							'2015' : 110,
							'2016' : 105
						},
						recommendations : [
							{"clientId":181, "averageCost":34180},
							{"clientId":1993, "averageCost":34180}
						]
					});
				}
			};

			chartFactory = {
				pie : function(){},
				barChart : function(){},
				lineRenwal : function(){},
				lineBusiness : function(){}
			};

			httpBackend.when('GET', properties.getRecommendationType).respond();
			httpBackend.when('GET', properties.getRecommendationRegion).respond();
			httpBackend.when('GET', properties.getRecommendationTop).respond();
			httpBackend.when('GET', properties.getRecommendationProducts).respond();
			httpBackend.when('GET', properties.getRecommendationProductDetails).respond();

			ctrl = $controller(summaryCtrl, { $scope: scope, httpCalls: httpCalls, $timeout : $timeout, $window : $window,
				chartFactory:  chartFactory,
				$sce : $sce
			});
		}));

		it('scoped methods to have been called and correct hash set on client select', function(){
			var row = [{clientId:1234}];
			spyOn(ctrl, 'scopeBindedMethods');
			ctrl.scopeBindedMethods();
			expect(ctrl.scopeBindedMethods).toHaveBeenCalled();
			scope.onTopRecommendation(row);
			expect(window.location.hash).toBe("#/ClientDetails/1234");
		});

		it('Recommendation type pies set up : getRecommendationType()', function(){
			var recommendationTopGridHeader = {
				clientName : {label: 'Client Name'}
			};

			ctrl.getRecommendationType();

			expect(scope.recommendationTopGrid.headerData.clientName.label).toBe('Client Name');
			expect(scope.recommendationTopRegionGrid.headerData.clientName.label).toBe('Client Name');

		});

		it('Recommendation type pie get data from server : getRecommendationType()', function(){
			spyOn(ctrl.chartFactory, 'pie');
			ctrl.getRecommendationType();
			httpBackend.expectGET(properties.getRecommendationType);
			expect(ctrl.recommendationType.data).toEqual([ [ 'Fund Admins', 185 ], [ 'Sell-Side', 2709 ] ]);
			expect(ctrl.chartFactory.pie).toHaveBeenCalled();
		});

		it('Recommendation Region pie get data from server : getRecommendationType()', function(){
			spyOn(ctrl.chartFactory, 'pie');
			ctrl.getRecommendationType();
			httpBackend.expectGET(properties.getRecommendationRegion);
			expect(ctrl.recommendationRegion.data).toEqual([ [ 'Russian Federation', 12 ], [ 'Singapore', 173 ] ]);
			expect(ctrl.chartFactory.pie).toHaveBeenCalled();
		});

		it('Able to create recommendation table bease on pie type selected : createRecommendationTable(), chartType = type', function(){
			var label = 'Buy Side',
				chart = {
					renderTo : {
						id : 'recommendation-types'
					}
				}
			ctrl.createRecommendationTable(label, chart);
			httpBackend.expectGET(properties.getRecommendationTop);
			expect(scope.recommendationTopGrid.grid).toEqual([{"clientName":"Skandinaviska Enskilda Banken AB"},{"clientName":"Mufg Union Bank, N.a"}]);
			expect(scope.type).toBe('Buy Side');

			//Toogle click
			ctrl.createRecommendationTable(label, chart);
			expect(scope.type).toBe(undefined);
			expect(scope.recommendationTopGrid.grid).toEqual([]);
		});

		it('Able to create recommendation table bease on pie type selected : createRecommendationTable(), chartType = region', function(){
			var label = 'Singapore',
				chart = {
					renderTo : {
						id : 'recommendation-region'
					}
				}
			ctrl.createRecommendationTable(label, chart);
			httpBackend.expectGET(properties.getRecommendationTop);
			expect(scope.recommendationTopRegionGrid.grid).toEqual([{"clientName":"Skandinaviska Enskilda Banken AB"},{"clientName":"Mufg Union Bank, N.a"}]);
			
			//Toogle click
			ctrl.createRecommendationTable(label, chart);
			expect(scope.type).toBe(undefined);
			expect(scope.recommendationTopRegionGrid.grid).toEqual([]);
		});

		it('Able to create recommendation Product : createProductGridChart ()', function(){
			spyOn(ctrl.chartFactory, 'barChart');
			spyOn(ctrl, 'createProductGridChart');
			ctrl.getRecommendedProduct();
			expect(scope.recommendationGrid.headerData.clientName.label).toBe('Client Name');
			httpBackend.expectGET(properties.getRecommendationProducts);
			expect(ctrl.recommendationProduct.series[0].data).toEqual([{y:26, color:'#decf07'}, {y:9}]);
			expect(scope.recommendedLabel).toBe('DSMatch');
			expect(ctrl.chartFactory.barChart).toHaveBeenCalled();
			expect(ctrl.createProductGridChart).toHaveBeenCalled();
		});

		it('Able to create recommendation Product Grid and chart: createProductGridChart ()', function(){
			spyOn(ctrl.chartFactory, 'lineRenwal');
			spyOn(ctrl.chartFactory, 'lineBusiness');
			ctrl.getRecommendedProduct('DSMatch');
			expect(scope.recommendedLabel).toBe('DSMatch');
			httpBackend.expectGET(properties.getRecommendationProductDetails);
			expect(scope.recommendations).toEqual([{"clientId":181, "averageCost":34180},{"clientId":1993, "averageCost":34180}]);
			expect(scope.recommendationGrid.grid).toEqual([{"clientId":181, "averageCost":34180},{"clientId":1993, "averageCost":34180}]);
			expect(ctrl.newBusinessTrends).toEqual({container: 'newBusinessTrends', title: "<span class='label-chart'>New business trends: <em class='label-heading'>DSMatch</em></span>", seriesName: 'No. of clients', categories: ['2015', '2016'], data: [262, 235]});
			expect(ctrl.renewalTrends).toEqual({container: 'renewalTrends', title: "<span class='label-chart'>New renewal trends: <em class='label-heading'>DSMatch</em></span>", seriesName: 'No. of clients', categories: ['2015', '2016'], data: [110, 105]});
			timeout.flush();
			expect(ctrl.replace).toBe(true);
			expect(ctrl.chartFactory.lineRenwal).toHaveBeenCalled();
			expect(ctrl.chartFactory.lineBusiness).toHaveBeenCalled();
		});
		
	});

});