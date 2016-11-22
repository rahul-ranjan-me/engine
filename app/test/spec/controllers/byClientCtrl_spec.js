define([

	'angular',
	'controllers/byClients',
	'properties', 
	'angularMocks'
], 
function(
	angular,
	byClients,
	properties
) {

	describe('Client search Controller Test', function(){
		var scope, ctrl, httpCalls, selectedData;

		beforeEach(inject(function($controller, $rootScope, $compile) {
			scope = $rootScope.$new();
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

			httpCalls = {
				getFilterdData : function(params, headers, callback){
					callback({"clients": ["ABSA BANK LTD", "ABSOLUTE CAPITAL GROUP LIMITED"], "clientType" : ["Buy-Side","Other"]});
				},
				doRecommClientSearch : function(params, headers, callback){
					callback([{"clientId":1234, "totalNewOpportunity":678098}]);
				}
			}

			ctrl = $controller(byClients, { $scope: scope, httpCalls:httpCalls, selectedData:selectedData });
		}));

		it('Able to get and set filter data', function() {
			expect(ctrl.selectedData.filtersCached.get()).toEqual({"clients": ["ABSA BANK LTD", "ABSOLUTE CAPITAL GROUP LIMITED"], "clientType" : ["Buy-Side","Other"]});
			expect(scope.prefetchedFilters).toEqual({"clients": ["ABSA BANK LTD", "ABSOLUTE CAPITAL GROUP LIMITED"], "clientType" : ["Buy-Side","Other"]});
		});

		it('Able to searchBy Client', function(){
			expect(scope.recommendedByClient.grid).toEqual([]);
			scope.searchByClient();
			expect(scope.recommendedByClient.grid).toEqual([{"clientId":1234, "totalNewOpportunity":678098}]);
		});

		it('Check the status of button whether disabled or enabled', function(){
			expect(scope.isSearchDisabled()).toBe(true);

			scope.searchPayload.name = "Rahul";
			expect(scope.isSearchDisabled()).toBe(false);
		});

		it('Check the status of button whether disabled or enabled', function(){
			scope.onClientRowSelect([{"clientId":1234, "totalNewOpportunity":678098}]);
			expect(window.location.hash).toBe('#/ClientDetails/1234');
		});

	});

});