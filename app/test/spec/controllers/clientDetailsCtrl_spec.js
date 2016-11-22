define([

	'angular',
	'controllers/clientDetails',
	'properties', 
	'angularMocks'
], 
function(
	angular,
	clientDetails,
	properties
) {

	describe('Login AD Controller Test', function(){
		var scope, ctrl, httpCalls, selectedData, chartFactory, routeParams, similarClientObj, getRecommendedProductObj, getClientDetails;

		beforeEach(inject(function($controller, $rootScope, $compile) {
			scope = $rootScope.$new();
			scope.clientId = 1234;

			similarClientObj = [
			    {
			        "currentClientId":19697,
			        "similarClientId":7451,
			        "similarClientName":"JPMorgan Chase & Co.",
			        "similarClientType":"Sell-Side",
			        "similarClientRegion":"United States",
			        "similarClientInstitutionType":"International Bank",
			        "recommendationLevel":-2,
			        "products":[
			            "Parsing",
			            "Valuations Manager"
			        ]
			    }
			];

			getRecommendedProductObj = [
			    {
			        "clientId":19697,
			        "productFamilyId":1,
			        "productFamily":"Parsing",
			        "averageCost":34180,
			        "bySimilarClient":1,
			        "bySimilarProduct":1,
			        "bySalesPipeline":1,
			        "overallScore":3
			    }
			];

			getClientDetailsObj  = {
			    "clientId":19697,
			    "clientName":"COMMONWEALTH BANK OF AUSTRALIA",
			    "region":"Australia",
			    "type":"Sell-Side",
			    "institutionType":"National Bank",
			    "products":[
			        {
			            "productFamilyID":24,
			            "productFamily":"CDS Pricing Data"
			        }
			    ],
			    "purchaseHistory":[
			        {
			            "fiscalYear":2011,
			            "fiscalMonth":10,
			            "salesPerson":"Mark Putnam",
			            "productFamily":"Analytics",
			            "productName":"Production Licenses - Non-recurring"
			        }
			    ]
			};

			selectedData = {};

			selectedData.searchPayload = {
	    		set : function(data){
		    		this.searchPayloadData = data;
		    	},
		    	get : function(){
		    		return this.searchPayloadData;
		    	},
		    	searchPayloadData : []
	    	};

	    	selectedData.filtersCached = {
	    		set : function(data){
		    		this.filters = data;
		    	},
		    	get : function(){
		    		return this.filters;
		    	},
		    	filters : {}
	    	};

	    	chartFactory = {
				bubbleChart : function(){}
			};

			httpCalls = {
				getSimilarClient : function(params, headers, callback){
					callback(similarClientObj);
				},
				getRecommendedProduct : function(params, headers, callback){
					callback(getRecommendedProductObj);
				},
				getClientDetails : function(params, headers, callback){
					callback(getClientDetailsObj);
				}
			}

			ctrl = $controller(clientDetails, { $scope: scope, $routeParams:routeParams, httpCalls:httpCalls, selectedData:selectedData , chartFactory:chartFactory});
		}));

		it('Test scoped method var', function(){
			expect(scope.selectedTab).toBe('recommProduct');
			expect(scope.recommended).toEqual(getRecommendedProductObj);
		});


		it('Test scoped method : switchTab()', function(){
			expect(scope.similarClient).toBe(undefined);
			var ev = {
				preventDefault : function(){}
			};
			scope.switchTab(ev, 'similarClient');
			expect(scope.selectedTab).toBe('similarClient');
			expect(scope.similarClient).toEqual(similarClientObj);
			scope.switchTab(ev, 'recommProduct');
			expect(scope.selectedSimilarClient).toBe(undefined);
		});

		it('Test scoped method : selectClient()', function(){
			expect(scope.selectedSimilarClient).toBe(undefined);
			var item = similarClientObj[0];
			expect(item.selected).toBe(undefined);
			scope.selectClient(item);
			expect(item.selected).toBe(true);
			expect(scope.selectedSimilarClient).toBe(item);
		});

		it('Test scoped method : checkProduct()', function(){
			scope.selectedSimilarClient = similarClientObj[0];
			expect(scope.checkExisting('abc')).toBe(false);
			expect(scope.checkExisting('Parsing')).toBe(true);
		});

		it('Test scoped method : formatCost()', function(){
			expect(scope.formatCost(123456)).toBe('$ 123,456');
		});

		it('Test scoped method : calcMatch()', function(){
			expect(scope.calcMatch([1,2,3,4,5,6,7,8,9], 4)).toBe(5);
		});

		it('Test data for bubbleChart : updateClient()', function(){
			ctrl.updateClient(getClientDetailsObj);
			expect(scope.clientDetails).toEqual(getClientDetailsObj);
		});

	});

});