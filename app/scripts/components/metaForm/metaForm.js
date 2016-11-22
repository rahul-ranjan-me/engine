define(
	[
		"lodash",
		"text!../../../templates/metaForm.html"
	], 
	function(
		_,
		form
	){
    
	    return function(){
	    	return {
		    	template : form,
		    	scope : {
		    		metadata : '=',
		    		payload : '=',
		    		changedropdown : '&'
		    	},
		    	link : function($scope, elem, attrs, $timeout){
		    		$scope.formtype = attrs.formtype;

		    		$scope.changeDropdown = function(item){
		    			$scope.changedropdown({obj:$scope.payload[item.name], item:item});
		    		};

		    		$scope.validate = function(item){
		    			if(item.valid){
		    				if(item.valid === 'number'){
		    					if(!validateNumber($scope.payload[item.name])){
		    						item.placeholder = 'Please input a number';
		    						$scope.payload[item.name] = '';
		    					}else{
		    						item.placeholder = '';
		    					}
		    				}
		    			}
		    		}

		    		function validateNumber(input){
		    			if(isNaN(input)){
		    				return false;
		    			}else{
		    				return true;
		    			}
		    		}

		    		$scope.updatePayload = function(item, groupItem, val){
		    			if($scope.payload[item] === null){
		    				$scope.payload[item] = [];
		    			}
		    			if(val){
		    				$scope.payload[item].push(groupItem);
		    			}else{
		    				$scope.payload[item].splice(groupItem, 1);
		    				if($scope.payload[item].length < 1){
		    					$scope.payload[item] = null;
		    				}
		    			}
		    		}

		    	}
		    };
	    };	

	}
);