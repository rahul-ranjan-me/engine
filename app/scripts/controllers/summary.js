define(['properties'], 
	function(properties) {
		
	    function SummaryCtrl($scope, httpCalls, $timeout, $window, chartFactory, $sce, commonUtils){

	    	this.$scope = $scope;
	    	this.httpCalls = httpCalls;
	    	this.$timeout = $timeout;
	    	this.$sce = $sce;
	    	this.chartFactory = chartFactory;
	    	this.createRecommendationTable = this.createRecommendationTable.bind(this);
	    	this.createProductGridChart = this.createProductGridChart.bind(this);

	    	this.recommendationType = {
	    		container : 'recommendation-types',
	    		title : 'Recommendations by type',
	    		subtitle : 'Click to see data',
	    		seriesName : 'No. of clients',
	    		data : []
	    	};

	    	this.recommendationRegion = {
	    		container : 'recommendation-region',
	    		title : 'Recommendations by region',
	    		subtitle : 'Click to see data',
	    		seriesName : 'No. of clients',
	    		data : []
	    	};

	    	this.recommendationProduct = {
	    		container : 'recommended-products',
	    		title : 'Top 5 Recommended Products',
	    		subtitle : 'Click to see data',
	    		seriesName : 'No. of clients',
	    		data : []
	    	};

	    	this.newBusinessTrends = {
	    		container : 'newBusinessTrends',
	    		title : 'New business trends',
	    		seriesName : 'No. of clients',
	    		categories :[],
	    		data : []
	    	};

	    	this.renewalTrends = {
	    		container : 'renewalTrends',
	    		title : 'New renewal trends',
	    		seriesName : 'No. of clients',
	    		categories :[],
	    		data : []
	    	};
	    	if($window.innerWidth < 800){
	    		this.$scope.mobile = true;
			}else{
				this.$scope.mobile = false;
			}

	    	this.replace = false;

	    	var callbackFunc = function(){
	    		this.scopeBindedMethods();
		    	this.getRecommendationType();
		    	this.getRecommendedProduct();
	    	}.bind(this);

	    	var params = {
	    		emailId : $scope.userInfo.userName,
	    		name : $scope.userInfo.profile.name
	    	};
			commonUtils.makeUserCalls(params, callbackFunc);
	    }

	    SummaryCtrl.prototype.getRecommendationType = function(){
	    	var likeDislike = function(elem, i, row){
	    		return this.$sce.trustAsHtml('<like-dislike clientname="'+row.clientName+'" productname="'+row.productFamilyName+'"></like-dislike>');
	        }.bind(this);

	        var createConnectLink = function(elem, i, row){
	        	return this.$sce.trustAsHtml('<a href="'+properties.connectURL+elem+'" target="_blank">'+elem+'</a>');
	        }.bind(this);

	        var recommendationTopGridHeader = {
	        	clientName: {
	                label:'Client Name',
	                id: 'clientName',
	                width:'30%'
	            },
	            productFamilyName: {
	                label:'Product',
	                id: 'productFamilyName',
	                width:'20%'
	            },
	            priority: {
	                label:'Priority',
	                id: 'priority',
	                width:'15%'
	            },
	            contactName: {
	                label:'Contact Name',
	                id: 'contactName',
	                formatWithHTML: createConnectLink,
	                width:'20%'
	            },
	            likeDislike: {
	                label: '',
	                id: 'likeDislike',
	                width : '15%',
	                formatWithHTML : likeDislike
	            }
	        };

	    	this.$scope.recommendationTopGrid = {
	    		headerData : recommendationTopGridHeader,
	    		grid : []
	    	};

	    	this.$scope.recommendationTopRegionGrid = {
	    		headerData : recommendationTopGridHeader,
	    		grid : []
	    	};
	    	
			this.httpCalls.getRecommendationType(null, null, function(data){
				var dataToSend = [];
				for(var i in data){
					dataToSend.push([i, data[i]]);
				}
				this.recommendationType.data = dataToSend;
				this.chartFactory.pie(this.recommendationType, this.createRecommendationTable);
			}.bind(this));	


			this.httpCalls.getRecommendationRegion(null, null, function(data){
				var dataToSend = [];
				for(var i in data){
					dataToSend.push([i, data[i]]);
				}
				this.recommendationRegion.data = dataToSend;
				this.chartFactory.pie(this.recommendationRegion, this.createRecommendationTable);
			}.bind(this));	

		 };

	    SummaryCtrl.prototype.createRecommendationTable = function(label, chart){
			
			var heightToShow,
				param = {},
				type = chart.renderTo.id ==='recommendation-types' ? 'type' : 'region',
				showDivs = function (){
					if(this.$scope.region || this.$scope.type){
						$('.grid-wrapper').height(286);
					}else{
						$('.grid-wrapper').height(0);	
					}
				}.bind(this);

			param[type] = label;

			if(this.$scope.mobile){
				heightToShow = 'auto';
			}else{
				heightToShow = '286px';
			}

			
			if(label === this.$scope[type]){

				
				delete this.$scope[type];
				
				if(type === 'type'){
					this.$scope.recommendationTopGrid.grid = [];
					this.$scope.$broadcast('recommendationTopGrid', this.$scope.recommendationTopGrid);
					$('#recommendationGrid').css({height:0, opacity:0});
				}else if(type === 'region'){
					this.$scope.recommendationTopRegionGrid.grid = [];
					this.$scope.$broadcast('recommendationTopRegionGrid', this.$scope.recommendationTopRegionGrid);
					$('#recommendationRegionGrid').css({height:0, opacity:0});
				}
				//showDivs();

			}else{
				this.httpCalls.getRecommendationTop(param, null, function(data){
					
					this.$scope[type] = label;

					if(type === 'type'){
						this.$scope.recommendationTopGrid.grid = data;
						this.$scope.$broadcast('recommendationTopGrid', this.$scope.recommendationTopGrid);
						$('#recommendationGrid').css({height:heightToShow, opacity:1});
						$('#recommendationGrid .box').css({'background':'#4a4949'});
						var colorChange1 = window.setTimeout(function(){
							$('#recommendationGrid .box').css({'background':'#2f2f2f'});
							clearTimeout(colorChange1);
						},200);
					}else{
						this.$scope.recommendationTopRegionGrid.grid = data;
						this.$scope.$broadcast('recommendationTopRegionGrid', this.$scope.recommendationTopRegionGrid);
						$('#recommendationRegionGrid').css({height:heightToShow, opacity:1});
						$('#recommendationRegionGrid .box').css({'background':'#4a4949'});
						var colorChange2 = window.setTimeout(function(){
							$('#recommendationRegionGrid .box').css({'background':'#2f2f2f'});
							clearTimeout(colorChange2);
						},200);
					}

					//showDivs();
				}.bind(this));
			}

	    };

	    SummaryCtrl.prototype.getRecommendedProduct = function(){
	    	var likeDislike = function(elem, i, row){
	    		return this.$sce.trustAsHtml('<like-dislike clientname="'+row.clientName+'" productname="'+this.$scope.recommendedLabel+'"></like-dislike>');
	        }.bind(this);

	    	this.$scope.recommendationGrid = {
	    		headerData : { 
		            clientName: {
		                label:'Client Name',
		                id: 'clientName',
		                width:'30%'
		            },
		            region: {
		                label:'Region',
		                id: 'region',
		                width:'30%'
		            },
		            type: {
		                label:'Type',
		                id: 'type',
		                width:'30%'
		            },
		            likeDislike: {
		                label: '',
		                id: 'likeDislike',
		                width : '10%',
		                formatWithHTML : likeDislike
		            }
		        },
	    		grid : []
	    	};

	    	this.httpCalls.getRecommendationProducts(null, null, function(data){
				this.recommendationProduct.series = [{
					name: 'Product',
					data : []
				}];

				this.recommendationProduct.categories = [];

				var tempArr = [],
					sortedArr;
				for(var i in data){
					var tempObj = {};
					tempObj[i] = data[i];
					tempObj.val = data[i];
					tempArr.push(tempObj);
				}

				sortedArr =  _.orderBy(tempArr, ['val'], ['desc']);

				for(var k =0; k<sortedArr.length; k++){
					delete sortedArr[k].val;
					for(var z in sortedArr[k]){
						this.recommendationProduct.categories.push(z);

						if(k === 0){
							this.recommendationProduct.series[0].data.push({y: sortedArr[k][z], color: '#decf07'});
						}else{
							this.recommendationProduct.series[0].data.push({y: sortedArr[k][z]});
						}
						
					}
				}

				this.$scope.recommendedLabel = this.recommendationProduct.categories[0];

				this.chartFactory.barChart(this.recommendationProduct, this.createProductGridChart, true);

				this.createProductGridChart(this.recommendationProduct.categories[0]);

			}.bind(this));
	    };

	    SummaryCtrl.prototype.createProductGridChart = function(label, chart){
	    	this.$scope.recommendedLabel = label;
	    	this.newBusinessTrends.title = "<span class='label-chart'>New business trends: <em class='label-heading'>"+label+"</em></span>";
	    	this.renewalTrends.title = "<span class='label-chart'>New renewal trends: <em class='label-heading'>"+label+"</em></span>";

	    	this.httpCalls.getRecommendationProductDetails({product:label}, null, function(data){

	    		this.$scope.recommendations = data.recommendations;

	    		this.$scope.recommendationGrid.grid = data.recommendations;
	    		this.$scope.$broadcast('recommendationGrid', this.$scope.recommendationGrid);
				
	    		this.newBusinessTrends.categories = [];
	    		this.newBusinessTrends.data = [];
	    		this.renewalTrends.categories = [];
	    		this.renewalTrends.data = [];

	    		for(var i in data.newBusinessTrend){
	    			this.newBusinessTrends.categories.push(i);
	    			this.newBusinessTrends.data.push(data.newBusinessTrend[i]);
	    		}

	    		for(var z in data.renewalTrend){
	    			this.renewalTrends.categories.push(z);
	    			this.renewalTrends.data.push(data.renewalTrend[z]);
	    		}

	    		this.$timeout(function(){
					this.chartFactory.lineRenwal(this.renewalTrends, this.replace);
		    		this.chartFactory.lineBusiness(this.newBusinessTrends, this.replace);
		    		

		    		if(!this.$scope.mobile && this.replace){
						window.scrollTo( 0, 1000 );
					}

					this.replace = true;

				}.bind(this));

	    		$('.recomm-product-data .box').css({'background':'#4a4949'});
				var colorChange2 = window.setTimeout(function(){
					$('.recomm-product-data .box').css({'background':'#2f2f2f'});
					clearTimeout(colorChange2);
				},200);


	    	}.bind(this));
	    };

	    SummaryCtrl.prototype.scopeBindedMethods = function(){
	    	this.$scope.onTopRecommendation = function(row){
	    		window.location.hash = "/ClientDetails/"+row[0].clientId;
	    	};
	    };

	    return SummaryCtrl;
	}
);