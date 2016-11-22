define(['properties', '../components/alerter/alerter'], 
	function(properties, alerter) {
		
	    function ClientDetails($scope, $compile, $routeParams, httpCalls, selectedData, chartFactory, $sce, commonUtils){
	    	this.$scope = $scope;
	    	this.$compile = $compile;
	    	this.httpCalls = httpCalls;
	    	this.selectedData = selectedData;
	    	this.chartFactory = chartFactory;

	    	this.$sce = $sce;
	    	this.$scope.clientSearchAPI = properties.doClientNameSearch;
	    	this.$scope.clientId = $routeParams;
	    	this.updateClient = this.updateClient.bind(this);
	    	this.$scope.searchPayload = {
	    		clientName : ''
	    	};

	    	this.clientWithSalesPipeline = [];
	    	this.allRecommendedClients = [];

	    	var callbackFunc = function(){
	    		this.scopedMethod();
		    	this.clientDetails();
		    	this.gridFixes();

		    	this.filterData();
	    	}.bind(this);

	    	var params = {
	    		emailId : $scope.userInfo.userName,
	    		name : $scope.userInfo.profile.name
	    	};
			commonUtils.makeUserCalls(params, callbackFunc);

	    }

	    ClientDetails.prototype.filterData = function(){
			if(Object.keys(this.selectedData.filtersCached.get()).length < 1){
				this.httpCalls.getFilterdData(null, null, function(resp){
					this.selectedData.filtersCached.set(resp);
					this.$scope.prefetchedFilters = resp;
				}.bind(this));
			}else{
				this.$scope.prefetchedFilters = this.selectedData.filtersCached.get();
			}
		};

	    ClientDetails.prototype.clientDetails = function(){
	    	this.httpCalls.getClientDetails(this.$scope.clientId, null, this.updateClient);
	    };

	    ClientDetails.prototype.updateClient = function(response){
	    	this.$scope.clientDetails = response;
	    	var data = [];
	    	for(var i=0; i<response.purchaseHistory.length; i++){
	    		var dataToPush = {
	    			x : response.purchaseHistory[i].fiscalYear,
	    			y : response.purchaseHistory[i].fiscalMonth,
	    			z : Math.random(),
	    			productName : response.purchaseHistory[i].productName,
	    			productFamily: response.purchaseHistory[i].productFamily,
	    			salesPerson : response.purchaseHistory[i].salesPerson
	    		};
	    		data.push(dataToPush);
	    	}
	    	this.chartFactory.bubbleChart(data, this.secondInit);
	    };

	    ClientDetails.prototype.scopedMethod = function() {
	    	this.$scope.selectedTab = 'recommProduct';
	    	var tickCross = function(elem, i, row){
	    		var html;
	    		if(row[i]){
	    			html = "<i class='glyphicon glyphicon-ok'></i>";
	    		}else{
	    			html = "<i class='glyphicon glyphicon-remove'></i>";
	    		}
	    		return this.$sce.trustAsHtml(html);
	        }.bind(this),
	        formatCost = function(val){
				return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			},
			calcMatch = function(elem, i , row){
				return parseInt(this.$scope.clientDetails.products.length) - parseInt(Math.abs(elem));
			}.bind(this);

	    	var recommendedProductHeaderDetails = { 
	            productFamily: {
	                label:'Product',
	                id: 'productFamily',
	                width:'30%'
	            },
	            bySimilarAttributes: {
	                label:'Similar Attributes',
	                id: 'bySimilarAttributes',
	                width:'20%',
	                formatWithHTML : tickCross,
	                align:'center'
	            },
	            bySimilarProduct: {
	                label:'Similar Products',
	                id: 'bySimilarProduct',
	                width:'20%',
	                formatWithHTML : tickCross,
	                align:'center'
	            },
	            byProductSales: {
	                label:'Product Sales',
	                id: 'byProductSales',
	                width:'20%',
	                formatWithHTML : tickCross,
	                align:'center'
	            },
	            overallScore: {
	                label:'Score',
	                id: 'overallScore',
	                width:'10%',
	                align:'right'
	            }
	        },
	        similarClientListHeaderDetails = {
	        	similarClientName: {
	                label:'Client name',
	                id: 'similarClientName',
	                width:'35%',
	                sort:true
	            },
	            similarClientInstitutionType: {
	                label:'Institution',
	                id: 'similarClientInstitutionType',
	                width:'20%',
	                sort:true
	            },
	            similarClientRegion: {
	                label:'Region',
	                id: 'similarClientRegion',
	                width:'17%',
	                sort:true,
	                sorted : 'desc'
	            },
	            matchScore: {
	                label:'No. of Matches',
	                id: 'matchScore',
	                width:'18%',
	                align:'right',
	                sort:true
	            },
	            similarClientType: {
	                label:'Type',
	                id: 'similarClientType',
	                width:'10%',
	                sort:true
	            }
	        },
	        similarClientListAttributesHeaderDetails = {
	        	similarClientName: {
	                label:'Client name',
	                id: 'similarClientName',
	                width:'35%',
	                sort:true
	            },
	            similarClientRegion: {
	                label:'Region',
	                id: 'similarClientRegion',
	                width:'65%',
	                sort:true,
	                sorted : 'desc'
	            }
	        };

	    	this.$scope.productRecommendationDetails = {
	    		headerData : recommendedProductHeaderDetails,
	    		grid : []
	    	};

	    	this.$scope.similarClientsAttributes = {
	    		headerData : similarClientListAttributesHeaderDetails,
	    		grid : []
	    	};

	    	this.$scope.similarClientsProducts = {
	    		headerData : similarClientListHeaderDetails,
	    		grid : []
	    	};

	    	this.$scope.similarClientByAttributes = {};
	    	this.$scope.similarClientSales = [];


	    	this.$scope.switchTab = function(ev, whichTab){
	    		ev.preventDefault();
	    		this.$scope.selectedTab = whichTab;

	    		if(whichTab === 'similarClientsProducts' && !this.$scope.similarClientsProducts.grid.length){
	    			this.httpCalls.getSimilarClientsProducts(this.$scope.clientId, null, function(data){
	    				this.$scope.similarClientsProducts.grid = data;
						this.$scope.$broadcast('similarClientsProducts', this.$scope.similarClientsProducts);
						this.gridFixes('similarClientsProducts', 353);
					}.bind(this));
	    		}else if(whichTab === 'similarClientsAttributes' && !Object.keys(this.$scope.similarClientByAttributes).length){
	    			this.httpCalls.getSimilarClientsAttributes(this.$scope.clientId, null, function(data){
	    				this.$scope.similarClientByAttributes = data;
	    			}.bind(this));
	    			delete this.$scope.selectedSimilarClient;
	    		}else if(whichTab === 'similarClientSales' && !this.$scope.similarClientSales.length){
	    			this.httpCalls.similarClientSales(this.$scope.clientId, null, function(data){
	    				this.$scope.similarClientSales = data;
	    			}.bind(this));
	    			delete this.$scope.selectedSimilarClient;
	    		}else{
	    			delete this.$scope.selectedSimilarClient;
	    		}
	    	
	    	}.bind(this);

	    	this.$scope.arrangeBySales = function(isBySales){
	    		if(isBySales){
	    			this.$scope.productRecommendationDetails.grid = this.clientWithSalesPipeline;
				}else{
	    			this.$scope.productRecommendationDetails.grid = this.allRecommendedClients;
				}
	    		this.$scope.$broadcast('productRecommendationDetails', this.$scope.productRecommendationDetails);
	    		this.gridFixes('productRecommendationDetails', 342);
	    	}.bind(this);

	    	this.$scope.showSimilarClient = function(similarClients){
	    		this.$scope.similarClientsAttributes.grid = similarClients ? similarClients.clients : [];
				this.$scope.$broadcast('similarClientsAttributes', this.$scope.similarClientsAttributes);
				this.gridFixes('similarClientsAttributes', 320);
			}.bind(this);

	    	this.$scope.onSimilarAttributeClientSelect = function(row){
	    		window.location.hash = '/ClientDetails/'+row[0].similarClientId;
	    	}.bind(this);

	    	this.$scope.getSimilarClientsSoldProduct = function(product){
	    		if(product){
		    		this.$scope.oftenSoldWith = product.oftenSoldWith;
		    		this.httpCalls.getProductSales({product:product.productFamily}, null, function(data){
	    				this.$scope.productSoldToClients = data.clients;
	    			}.bind(this));
	    		}else{
	    			delete this.$scope.oftenSoldWith;
	    			delete this.$scope.productSoldToClients;
	    		}
			}.bind(this);


	    	this.paintRecommendedGrid();


			this.$scope.onSimilarClientSelect = function(item){
				this.$scope.selectedSimilarClient = item[0];
			}.bind(this);


			this.$scope.checkProduct = function(product){
				if(_.find(this.$scope.clientDetails.products, { 'productFamily': product })){
					return true;
				}else{
					return false;
				}
			}.bind(this);

			this.$scope.checkExisting = function(product){
				if(this.$scope.selectedSimilarClient.products.indexOf(product) !== -1){
					return true;
				}else{
					return false;
				}
			}.bind(this);
	    	
	    	this.$scope.toolTip = function(ev, action, product, client){
				var elem = $(ev.target),
					elemPosition = elem.position(),
					clientName = client ? client : this.$scope.selectedSimilarClient.similarClientName,
					toolTipHTML = "<div class='tooltip-cont'><p class='toolTipContent'><span style='color:#08ac4b'>"+clientName+"</span><br /> is not having <br /><span style='color:#decf07'>"+product+"</span></p><span class='glyphicon glyphicon-triangle-bottom tip'></span></div>";

				if(action === 'show'){
					elem.append(toolTipHTML);
					
					var toolTip = $('body').find('.tooltip-cont');
					
					toolTip.css({
						left: elemPosition.left - toolTip.width()/2 -10,
						top: elemPosition.top - toolTip.height() - 20
					});
				}else{
					$('body').find('.tooltip-cont').remove();
				}
				
			}.bind(this);

			this.$scope.formatCost = function(val){
				return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			};

			this.$scope.calcMatch = function(totalProduct, level){
				return parseInt(totalProduct.length) - parseInt(Math.abs(level));
			};

			this.$scope.newClientFetch = function(isEdit){
				this.$scope.isEdit = isEdit;
			}.bind(this);

			this.$scope.saveCancelClient = function(isSearch){
				if(!isSearch){
					this.$scope.isEdit = false;
					this.$scope.searchPayload.clientName = '';
				}else{
					this.httpCalls.doRecommClientSearch({name : this.$scope.searchPayload.clientName}, null, function(data){
						if(data && data.length){
							window.location.hash = '/ClientDetails/'+data[0].clientId;
						}else{
							alerter.error('Recommends', 'No data found for "<strong>'+this.$scope.searchPayload.clientName+'</strong>"', ['OK']);
							this.$scope.isEdit = false;
							this.$scope.searchPayload.clientName = '';
						}
					}.bind(this));
				}
			}.bind(this);

			this.$scope.stopEvent = function(ev){
				ev.stopPropagation();
			};

			$(document).on('click', function(ev){
				this.$scope.isEdit = false;
				this.$scope.searchPayload.clientName = '';
				this.$scope.$apply();
			}.bind(this));

	    };

	    ClientDetails.prototype.paintRecommendedGrid = function(){
	    	this.httpCalls.getRecommendedProduct(this.$scope.clientId, null, function(data){
	    		this.$scope.productRecommendationDetails.grid = data;
				this.$scope.$broadcast('productRecommendationDetails', this.$scope.productRecommendationDetails);
	    		this.allRecommendedClients = data;
	    		for(var i = 0; i<data.length; i++){
	    			if(data[i].bySalesPipeline){
	    				this.clientWithSalesPipeline.push(data[i]);
	    			}
	    		}
				this.gridFixes('productRecommendationDetails', 342);
			}.bind(this));
	    };

	    ClientDetails.prototype.gridFixes = function(gridId, height){
	    	var grid = $('.'+gridId);
	    	var delay = window.setTimeout(function(){
	    		if(grid.find('.grid-vertical-scroll').height() < height){
		    		grid.find('.header-container').css('padding-right', 0);
				}else{
					grid.find('.header-container').css('padding-right', '12px');
				}
				clearTimeout(delay);
			},200);
	    };

	    return ClientDetails;
	}
);