define(
	[
		'text!../../templates/likeDislike.html',
		'text!../../templates/dislikeReason.html'
	], 
	function(likeDislike, dislikeReason){
    
	    return function($http, $compile, $timeout){
	    	return {
	    		template: likeDislike,
	    		scope : {},
		    	replace : true,
		    	link : function($scope, elem, attrs){
		    		$scope.voted = function(ev, type){
		    			ev.stopPropagation();
		    			var reasonVisible = $(elem[0]).find('.dislike-reason-container').length;

		    			removePopup();

		    			$scope.payload = {
		    				reason : '',
		    				comment : ''
		    			};

		    			$scope.reasons = ['Product already sold to this client', 'Already pitched, client not interested', 'Sold to parent company'];

		    			$scope.clientName = attrs.clientname;
		    			$scope.productName = attrs.productname;

		    			if(type === 'down'){
		    				if(!reasonVisible){
			    				$(elem[0]).append($compile(dislikeReason)($scope));
			    				var elemPosition = $(elem[0]).position();
			    				$('.dislike-reason-container').css({left:elemPosition.left-270, top:elemPosition.top-100, opacity:1});
			    			}
		    			}else{
		    				$scope.vote = type;
		    			}
		    		};

		    		$scope.submitDislike = function(){
		    			removePopup();
		    			$scope.vote = 'down';
		    		};

		    		$scope.preventDefault = function(ev){
	    				ev.stopPropagation();
	    			};

	    			$(document).on('click', function(){
		    			removePopup();
		    		});

		    		$(document).on('keyup', function(e){
		    			if(e.keyCode === 27){
		    				removePopup();
		    			}
		    		});

		    		function removePopup(){
		    			$('.dislike-reason-container').remove();
		    		}
		    	}
		    };
	    };	

	}
);

