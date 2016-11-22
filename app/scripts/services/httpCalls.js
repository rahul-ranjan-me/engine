define([
		'properties'
	], 
	function(
		properties
	) {
	    
	    return function(xhr){
	    	
	    	this.performLogin = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.performLogin, params, callback, errorCallback, headers, true);
	    	};

	    	this.user = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.user, params, callback, errorCallback);
	    	};

	    	this.getProductRecommendation = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getProductRecommendation, params, callback, errorCallback);
	    	};

	    	this.getLeadCount = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getLeadCount, params, callback, errorCallback);
	    	};
			
			this.getLeadPrediction = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getLeadPrediction, params, callback, errorCallback);
	    	};
	    	
	    	this.getFilterdData = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getFilterdData, params, callback, errorCallback);
	    	};

	    	this.doRecommClientSearch = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.doRecommClientSearch, params, callback, errorCallback);
	    	};

			this.getClientDetails = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getClientDetails, params, callback, errorCallback);
	    	};
	   		
	   		this.getRecommendedProduct = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getRecommendedProduct, params, callback, errorCallback);
	    	};
	    	
			this.getSimilarClientsProducts = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getSimilarClientsProducts, params, callback, errorCallback);
	    	};

	    	this.getSimilarClientsAttributes = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getSimilarClientsAttributes, params, callback, errorCallback);
	    	};

	    	this.similarClientSales = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.similarClientSales, params, callback, errorCallback);
	    	};

	    	this.getProductSales = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getProductSales, params, callback, errorCallback);
	    	};

	    	this.getRenewals = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getRenewals, params, callback, errorCallback);
	    	};

			this.getRenewalProducts = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getRenewalProducts, params, callback, errorCallback);
	    	};

	    	this.getRecommendationType = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getRecommendationType, params, callback, errorCallback);
	    	};
			
			this.getRecommendationRegion = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getRecommendationRegion, params, callback, errorCallback);
	    	};

	    	this.getRecommendationTop = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getRecommendationTop, params, callback, errorCallback);
	    	};

	    	this.getRecommendationProducts = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getRecommendationProducts, params, callback, errorCallback);
	    	};

	    	this.getRecommendationProductDetails = function(params, headers, callback, errorCallback){
	    		$('.loader').show();
	    		xhr.get(properties.getRecommendationProductDetails, params, callback, errorCallback);
	    	};

	    	this.getNotes = function(params, headers, callback, errorCallback){
	    		xhr.get(properties.getNotes, params, callback, errorCallback);
	    	};

	    };	

	}
);