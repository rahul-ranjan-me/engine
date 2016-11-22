define(
	[], 
	function(){
    
	    return function($parse, $compile){
	    	return {
		        link: function(scope, element, attr){
		            var parsed = $parse(attr.ngBindHtml);
		            function getStringValue() { return (parsed(scope) || '').toString(); }

		            //Recompile if the template changes
		            scope.$watch(getStringValue, function() {
		                $compile(element, null, -9999)(scope);
		            });
		        }         
		    };
	    };	

	}
);