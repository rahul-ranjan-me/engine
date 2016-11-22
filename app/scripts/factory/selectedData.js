define([], 
	function(
	) {
	    
	    return function(){
	    	
	    	var selectedData = {};

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

	    	selectedData.userDetails = {
	    		set : function(data){
	    			this.userDetails = data;
	    		},
	    		get : function(){
	    			return this.userDetails;
	    		},
	    		userDetails : {}
	    	};

	    	return selectedData;
	    };	

	}
);