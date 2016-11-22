define([
		'../configs/headerOpenLeadsRecommendation',
		'../configs/headerRenewalReportGrid'
	], 
	function(
		productRecommendationHeader,
		renewalReportGridHeader
		) {
		
	    function SalesCtrl($scope, $compile, $timeout, httpCalls, chartFactory, commonUtils){
	    	this.$scope = $scope;
	    	this.$compile = $compile;
	    	this.$timeout = $timeout;
	    	this.httpCalls = httpCalls;
	    	this.chartFactory = chartFactory;

	    	this.renderProductRecommendation = this.renderProductRecommendation.bind(this);
	    	this.getLeadCount = this.getLeadCount.bind(this);
	    	this.getLeadPrediction = this.getLeadPrediction.bind(this);
	    	this.renewals = {
	    		container : 'renewal-client',
	    		title : '',
	    		subtitle : 'Click to see data',
	    		seriesName : 'No. of clients: ',
	    		data : []
	    	};

	    	this.renewalProducts = {
	    		container : 'renewal-product',
	    		title : 'Products for renewal',
	    		subtitle : '',
	    		seriesName : 'No. of product: ',
	    		data : []
	    	};

	    	var callbackFunc = function(){
	    		this.scopedMethods();
		    	this.productRecommendation();
		    	this.httpCalls.getLeadCount(null, null, this.getLeadCount);
		    	this.httpCalls.getLeadPrediction(null, null, this.getLeadPrediction);
	    	}.bind(this);

	    	var params = {
	    		emailId : $scope.userInfo.userName,
	    		name : $scope.userInfo.profile.name
	    	};
			commonUtils.makeUserCalls(params, callbackFunc);

	    	
	    }

	    SalesCtrl.prototype.productRecommendation = function(){
	    	this.$scope.productRecommendationGrid = {
	    		headerData : productRecommendationHeader,
	    		grid : []
	    	};

	    	this.httpCalls.getProductRecommendation(null, null, this.renderProductRecommendation);
	    };

	    SalesCtrl.prototype.renderProductRecommendation = function(data){
	    	this.$scope.productRecommendationGrid.grid = data;	    	
	    	this.$scope.$broadcast('productRecommendationGrid', this.$scope.productRecommendationGrid);
	    };

	    SalesCtrl.prototype.getLeadCount = function(data){
	    	this.$scope.leadCounts = data;
	    };

	    SalesCtrl.prototype.getLeadPrediction = function(data){
	    	var chartData = {
	    		container : 'chart-prediction',
	    		title : 'Open opportunities by clients',
	    		drillTitle : 'Opportunities for ',
	    		subTitle : 'Click any column to view opportunities',
	    		drillSubTitle : 'Click any column to go back',
	    		yAxisText : 'No. of open opportunities',
	    		yAxisDrillTitle : 'Probabilities (%)',
	    		tooltip : '%',
	    		data : []
	    	};

	    	for(var i=0; i<data.length; i++){
	    		var dataToSend = {
	    			name : data[i].accountName,
	    			y : data[i].numberOfOpenLeads,
	    			drilldown : [
	    				{
	    					name: 'System probability',
	    					data : []
	    				},
	    				{
	    					name : 'Probability',
	    					data : []
	    				}
	    			],
	    			opportunityName : []
	    		};

	    		for(var z = 0; z < data[i].leads.length; z++){
	    			dataToSend.drilldown[0].data.push(data[i].leads[z].systemProbability);
	    			dataToSend.drilldown[1].data.push(data[i].leads[z].probability);
	    			dataToSend.opportunityName.push(data[i].leads[z].productFamily);
	    		}

	    		chartData.data.push(dataToSend);
	    	}
	    	this.chartFactory.columnDrilldown(chartData);
	    };

	    SalesCtrl.prototype.scopedMethods = function(){
	    	this.$scope.renewalReportGrid = {
	    		headerData : renewalReportGridHeader,
	    		grid : []
	    	};

	    	this.$scope.onClientRowSelect = function(row){
	    		window.location.hash = '/ClientDetails/'+row[0].clientId;
	    	};

	    	this.$scope.selectedTab = 'newBusiness';
	    	this.$scope.switchTab = function(whichTab){
	    		this.$scope.selectedTab = whichTab;

	    		if(whichTab === 'renewals'){
	    			/* Renwal reports starts here */
	    			if(this.renewals.data.length){
	    				this.createRenewals(this.renewals);
	    			}else{
	    				this.httpCalls.getRenewals(null, null, function(data){
	    					var dataToSend = [];
	    					for(var i = 0; i<data.length; i++){
		    					dataToSend.push([data[i].renewalStatus, data[i].countByRenewalStatus, {renewals : data[i].renewalLeads}]);
		    				}
		    				this.renewals.data = dataToSend;
		    				this.createRenewals(this.renewals, true);
		    			}.bind(this));	
	    			}
	    			/* Renwal reports ends here */

	    			/* Renwal product starts here */

	    			if(this.renewalProducts.data.length){
	    				this.createRenewalProducts(this.renewalProducts);
	    			}else{
	    				this.httpCalls.getRenewalProducts(null, null, function(data){

	    					var dataToSend = [],
	    						categories = [];
		    				for(var i in data){
		    					categories.push(i);
		    					dataToSend.push(data[i]);
		    				}
		    				this.renewalProducts.categories = categories;
		    				this.renewalProducts.data = dataToSend;
		    				this.createRenewalProducts(this.renewalProducts, true);
		    			}.bind(this));
	    			}

	    			/* Renwal product starts here */
	    			
	    		}

	    	}.bind(this);

	    };

	    SalesCtrl.prototype.createRenewals = function(chartData, chartInit){
	    	
	    	if(chartInit){
				this.chartFactory.donut(chartData, function updateTable(label, chart){
					for(var i in this.renewals.data){
						if(this.renewals.data[i][0] === label){
							this.$scope.renewalsObj = this.renewals.data[i][2].renewals;
							this.$scope.renewalsType = label;
							this.$scope.$apply();
						}
					}

					this.$scope.renewalReportGrid.grid = this.$scope.renewalsObj;
					this.$scope.$broadcast('renewalReportGrid', this.$scope.renewalReportGrid);
					
					this.$timeout(function(){
						chart.setSize($('#renewal-client').width(), 360);	
					});
					
				}.bind(this));
			}
		
	    };

	    SalesCtrl.prototype.createRenewalProducts = function(chartData, chartInit){
	    	if(chartInit){
				this.chartFactory.column(chartData, function(e, chart){
				});
			}
		
	    };

	    return SalesCtrl;
	}
);
