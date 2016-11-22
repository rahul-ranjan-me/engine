define(
	[
		'text!../../templates/note.html'
	], 
	function(note){
    
	    return function($http, $compile, $timeout, httpCalls){
	    	return {
	    		template: note,
	    		scope : {},
		    	replace : true,
		    	link : function($scope, elem, attrs){
		    		$scope.open = false;   		

		    		$scope.showNote = function(ev){
		    			ev.stopPropagation();
		    			$scope.open = !$scope.open;
		    			if($scope.open && !$scope.notes){
		    				httpCalls.getNotes(null, null, function(response){
				    			$scope.notes = response;
				    		}.bind(this));
		    			}
		    		};

		    		$scope.newComment = function(){
		    			var date = new Date(),
		    				day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(),
		    				month = parseInt(date.getMonth())+1 < 10 ? '0'+(parseInt(date.getMonth())+1) : parseInt(date.getMonth())+1;

		    			$scope.notes.push({date:day+'-'+month+'-'+date.getFullYear(), comment:$scope.comment});

		    			$('.comment-container .comment-box ul').animate({
		    				scrollTop : "50000px"
		    			}, 1000);

		    			$scope.comment = '';
		    		};

		    		$scope.preventDefault = function(ev){
		    			ev.stopPropagation();
		    		};

		    		$(document).on('click', function(){
		    			$scope.open = false;
		    			$scope.$apply();
		    		});
		    	}
		    };
	    };	

	}
);

