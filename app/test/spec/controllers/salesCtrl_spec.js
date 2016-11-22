define([

	'angular',
	'controllers/sales',
	'properties', 
	'angularMocks'
], 
function(
	angular,
	sales,
	properties
) {

	describe('Login AD Controller Test', function(){
		var scope, ctrl, httpCalls, selectedData, 
			chartFactory, routeParams, getLeadCountObj, getLeadPredictionObj, 
			getProductRecommendationObj, getRenewalsObj, getRenewalProductsObj;

		beforeEach(inject(function($controller, $rootScope, $compile) {
			scope = $rootScope.$new();
			
			getLeadCountObj = {"openLeads":361,"closedLeads":469,"lostLeads":124,"invalidLeads":75};

			getLeadPredictionObj = [
			    {
			        "accountName":"UBS AG (Global Parent)",
			        "numberOfOpenLeads":4,
			        "leads":[
			            {
			                "clientId":7444,
			                "opportunityName":"UBS Private Wealth - CDS/Bond Sectors",
			                "accountName":"UBS AG (Global Parent)",
			                "productFamily":"CDS Pricing Data",
			                "probability":10,
			                "systemProbability":10
			            }
			        ]
			    },
			    {
			        "accountName":"Quoniam Asset Management GmbH",
			        "numberOfOpenLeads":2,
			        "leads":[
			            {
			                "clientId":8642,
			                "opportunityName":"Quoniam RED",
			                "accountName":"Quoniam Asset Management GmbH",
			                "productFamily":"CDS Reference Data",
			                "probability":25,
			                "systemProbability":75
			            },
			            {
			                "clientId":8642,
			                "opportunityName":"Quoniam - CDS Indices Level 2",
			                "accountName":"Quoniam Asset Management GmbH",
			                "productFamily":"CDS Pricing Data",
			                "probability":75,
			                "systemProbability":25
			            }
			        ]
			    }
			];

			getProductRecommendationObj  = [
			    {
			        "clientId":6685,
			        "clientName":"Partners Group AG",
			        "recommendedProduct":"CDS Pricing Data | Counterparty Manager | Portfolio Valuations",
			        "productInPipeline":"Private Equity"
			    },
			    {
			        "clientId":1352,
			        "clientName":"Swiss Reinsurance America Corporation",
			        "recommendedProduct":"Loan Pricing Data | Indices Bonds | WSO Software | Notice Manager",
			        "productInPipeline":"Securitized Products Pricing - US"
			    }
			];

			getRenewalsObj = [
			    {
			        "renewalStatus":"WON",
			        "countByRenewalStatus":173,
			        "renewalLeads":[
			            {
			                "productFamily":"CDS Pricing Data"
			            }
			        ]
			    },
			    {
			        "renewalStatus":"PENDING",
			        "countByRenewalStatus":185,
			        "renewalLeads":[
			            {
			                "accountName":"Tsentralny Bank Rossiskoi Federatsii"
			            }
			        ]
			    },
			    {
			        "renewalStatus":"LOST",
			        "countByRenewalStatus":24,
			        "renewalLeads":[
			            {
			                "accountName":"Hardcastle Trading AG"
			            }
			        ]
			    },
			    {
			        "renewalStatus":"DOWNGRADED",
			        "countByRenewalStatus":1,
			        "renewalLeads":[
			            {
			                "accountName":"Deutsche Pfandbriefbank AG"
			            }
			        ]
			    }
			];

			getRenewalProductsObj = {
			    "Indices Bonds":53,
			    "Calendar - Vote":1,
			    "Corporate Actions":1
			};

			chartFactory = {
				columnDrilldown : function(){},
				donut : function(){},
				column : function(){}
			};

			httpCalls = {
				getLeadCount : function(params, headers, callback){
					callback(getLeadCountObj);
				},
				getLeadPrediction : function(params, headers, callback){
					callback(getLeadPredictionObj);
				},
				getProductRecommendation : function(params, headers, callback){
					callback(getProductRecommendationObj);
				},
				getRenewals : function(params, headers, callback){
					callback(getRenewalsObj);
				},
				getRenewalProducts : function(params, headers, callback){
					callback(getRenewalProductsObj);
				}
			};

			ctrl = $controller(sales, { 
				$scope: scope, 
				httpCalls:httpCalls, 
				chartFactory:chartFactory});
		}));

		it('Able to test scopedMethods var', function(){
			expect(scope.renewalReportGrid.grid).toEqual([]);
			expect(scope.selectedTab).toBe('newBusiness');
		});

		it('Able to test scopedMethods : onClientRowSelect()', function(){
			scope.onClientRowSelect([{clientId:1234}]);
			expect(window.location.hash).toBe('#/ClientDetails/1234');
		});

		it('Able to test scopedMethods : switchTab()', function(){
			expect(scope.selectedTab).toBe('newBusiness');
			scope.switchTab('renewals');
			expect(scope.selectedTab).toBe('renewals');
			expect(ctrl.renewals.data[0][1]).toBe(173);
			expect(ctrl.renewalProducts.data[0]).toBe(53)
		});

		it('Able to set grid data for productRecommendation : productRecommendation()', function(){
			expect(scope.productRecommendationGrid.grid).toEqual(getProductRecommendationObj);
		});

	});

});