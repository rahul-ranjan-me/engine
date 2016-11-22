define(
	[
		'text!../../templates/typeahead.html'
	], 
	function(typeahead){
    
	    return function($http, $timeout, $filter){
	    	return {
	    		template: typeahead,
	    		scope : {
	    			prefetched : '=',
	    			payload : '='
	    		},
		    	replace : true,
		    	link : function($scope, elem, attrs){
		    		$scope.$watch('payload', function(val){
		    			$scope.fieldLabelVal = val;
		    			$scope.prefetched = angular.copy(freezedItem);
		    			freezedItem = angular.copy($scope.prefetched);
		    		});

		    		var freezedItem = angular.copy($scope.prefetched);
		    		$scope.fieldLabelVal = $scope.payload;
		    		$scope.fieldLabel = attrs.fieldlabel;
		    		$scope.placeholder = attrs.placeholder;
		    		
		    		$scope.showSuggestion = function(ev, state){
		    			$('.typeahead .suggestion').css({height:0, opacity:0});
		    			$scope.prefetched = $filter('filter')(freezedItem, $scope.fieldLabelVal);
		    			$(ev.target).parents('.typeahead').find('.suggestion').css({height:'200px', opacity:1});
		    		};

		    		$scope.changeSuggestion = function(ev, state){
		    			//$scope.prefetched = $filter('filter')(freezedItem, $scope.fieldLabelVal);
		    		};
		    		
		    		$scope.makeServerCall = function(){
		    			if(attrs.api){
		    				var data = {
				    			search: $scope.fieldLabelVal
				    		};
		    				$http({
				    			url : attrs.api,
				    			method: 'GET',
				    			params: data ? data : {}
				    		})
				    		.then(function successCallback(response) {
						       	$scope.prefetched = response.data;
						    });
		    			}else{
		    				$scope.prefetched = $filter('filter')(freezedItem, $scope.fieldLabelVal);
		    			}
		    			$scope.payload = $scope.fieldLabelVal;
		    		};

		    		$scope.selectItem = function(item){
		    			$scope.fieldLabelVal = item;
		    			$scope.payload = item;
		    			$('.typeahead .suggestion').css({height:0, opacity:0});
		    		};

		    		$scope.clear = function(){
						$scope.fieldLabelVal = '';
						$scope.payload = $scope.fieldLabelVal;
		    		};

		    		$scope.preventEvent = function(ev){
		    			ev.stopPropagation();
		    		};

		    		$(document).on('click', function(){
		    			$('.typeahead .suggestion').css({height:0, opacity:0});
		    			$scope.$apply();
		    		});

		    	}
		    };
	    };	

	}
);

