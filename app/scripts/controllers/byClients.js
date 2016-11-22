define([
		'properties',
		'../configs/headerClientRecommendation'
	], 
	function(
		properties,
		headerClientRecommendation
		) {
		
	    function ByClientsCtrl($scope, $compile, httpCalls, selectedData, commonUtils){
	    	this.$scope = $scope;
	    	this.$compile = $compile;
	    	this.httpCalls = httpCalls;
	    	this.selectedData = selectedData;
	    	var callbackFunc = function(){
	    		this.filterData();
	    		this.scopedMethods();
	    	}.bind(this);

	    	var params = {
	    		emailId : $scope.userInfo.userName,
	    		name : $scope.userInfo.profile.name
	    	};
			commonUtils.makeUserCalls(params, callbackFunc);
	    	
	    	this.$scope.clientSearchAPI = properties.doClientNameSearch;
	    	this.$scope.searchPayload = {
	    		name : '',
	    		region : '',
	    		type : '',
	    		institutionType : ''
	    	};

	    	this.$scope.recommendedByClient = {
	    		headerData : headerClientRecommendation,
	    		grid : []
	    	};

	    	if(this.selectedData.searchPayload.get().length){
	    		this.$scope.searchPayload = this.selectedData.searchPayload.get()[0];
	    		this.$scope.searchByClient(true);
	    	}
	    }

		ByClientsCtrl.prototype.filterData = function(){
			if(Object.keys(this.selectedData.filtersCached.get()).length < 1){
				this.httpCalls.getFilterdData(null, null, function(resp){
					this.selectedData.filtersCached.set(resp);
					this.$scope.prefetchedFilters = resp;
				}.bind(this));
			}else{
				this.$scope.prefetchedFilters = this.selectedData.filtersCached.get();
			}
		};

		ByClientsCtrl.prototype.scopedMethods = function(isSet){
			this.$scope.searchByClient = function(){
				var params = {};
				for(var i in this.$scope.searchPayload){
					if(this.$scope.searchPayload[i]){
						params[i] = this.$scope.searchPayload[i];
					}
				}

				this.httpCalls.doRecommClientSearch(params, null, function(data){
					this.$scope.recommendedByClient.grid = data;
					this.$scope.$broadcast('recommendedByClient', this.$scope.recommendedByClient);
					this.gridFixes('recommendedByClient', 624);
				}.bind(this));
				if(!isSet){
					this.selectedData.searchPayload.set([this.$scope.searchPayload]);
				}
			}.bind(this);

			this.$scope.isSearchDisabled = function(){
				for(var i in this.$scope.searchPayload){
					if(this.$scope.searchPayload[i] && this.$scope.searchPayload[i].length > 0){
						return false;
					}
				}

				return true;
			}.bind(this);

			this.$scope.onClientRowSelect = function(row){
				window.location.hash = '/ClientDetails/'+row[0].clientId;
			};
		};

		ByClientsCtrl.prototype.gridFixes = function(gridId, height){
	    	var grid = $('.'+gridId);
	    	var delay = window.setTimeout(function(){
	    		if(grid.find('.grid-vertical-scroll').height() < height){
		    		grid.find('.header-container').css('padding-right', 0);
				}else{
					grid.find('.header-container').css('padding-right', 12);
				}
				clearTimeout(delay);
			},200);
	    };

	    return ByClientsCtrl;
	}
);
