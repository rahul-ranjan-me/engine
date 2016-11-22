define(
	[
		'text!../../templates/calendar.html',
		'../libs/bootstrap-datepicker'
	], 
	function(calendar, datepicker){
    
	    return function(httpCalls, popupUtils, $timeout){
	    	return {
	    		template: calendar,
	    		scope : {
		    		selecteddate : "=",
		    		item : "="
		    	},
		    	replace : true,
		    	link : function($scope, elem, attrs){
		    		
		    		$scope.placeholder = attrs.placeholder;
		    		$scope.dateid = attrs.dateid;
		    		$scope.isdisabled = attrs.isdisabled;
					
					$timeout(function(){
	    				if($scope.selecteddate){
		    				var date = new Date($scope.selecteddate),
		    					day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(),
		    					month = date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1,
		    					year = date.getFullYear();
		    				$(elem[0]).find('input').val(day+'/'+month+'/'+year);
	    				}
		    		}, 2000);

		    		$(elem[0]).datepicker({
		    			format : 'dd/mm/yyyy',
    					autoclose : true
		    		}).on('changeDate', function(e){
		    			$scope.selecteddate = new Date(e.date).valueOf();
		    			$scope.$apply();
		    		});
		    		
		    	}
		    };
	    };	

	}
);

