define(['../components/alerter/alerter'], 
	function(
		alerter
	) {
	    
	    return function(selectedData, httpCalls){
	    	
	    	var commonUtils = {};

	    	commonUtils.toCamelCase = function(str){
				return str.replace(/^[a-z]|[A-Z]/g, function(v, i) {
				    return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
				});
			};

			commonUtils.makeUserCalls = function(params, callback){
				if(Object.keys(selectedData.userDetails.get()).length){
					callback();
				}else{
					httpCalls.user(params, null, function(data){
						selectedData.userDetails.set(data);
			    		callback();
			    	}, function(){
			    		alerter.error('Recommends', 'Some error occured.', ['OK']);
			    	});
			    }
			};

	    	return commonUtils;
	    };	

	}
);