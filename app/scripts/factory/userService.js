define([], 
	function(
	) {
	    
	    return function(){
	    	
	    	var userService = {};

	    	// Will be used for GET request

	    	userService.set = function(key, data){
	    		var item = JSON.stringify(data);
	    		localStorage.setItem(key, item);
	    	};

	    	userService.get = function(key){
	    		var data = localStorage.getItem(key);
	    		return JSON.parse(data);
	    	};

	    	userService.remove = function(key){
	    		localStorage.remove(key);
	    	};

	    	return userService;
	    };	

	}
);