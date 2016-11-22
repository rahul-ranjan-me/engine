define([], 
	function(
	) {
	    
	    return function(){
	    	
	    	var popupUtils = {};

	    	// Will be used for GET request

	    	popupUtils.popup = function(elem, closePopup){
	    		var pos = 0,
					alpha = 0,
					id = setInterval(frame, 7);

	    		function frame() {
					if (pos === 50) {
						clearInterval(id);
					} else {
						pos++;
						if(alpha < 1){
							alpha = alpha +0.05;
							elem.querySelector('.popup').style.opacity = alpha;
						}						
						elem.querySelector('.popup').style.top = pos + '%'; 
					}
				}

				$(document).keyup(function(e) {
				    if (e.keyCode == 27) {
				    	popupUtils.closePopup(elem);
				    }
				});
	    	};

	    	popupUtils.closePopup = function(elem){
	    		$(elem).remove();
	    	};

	    	return popupUtils;
	    };	

	}
);