define(
	[
		'text!../../templates/columnChooser.html'
	], 
	function(columnChooser){
    
	    return function(httpCalls, popupUtils){
	    	return {
	    		template: columnChooser,
	    		replace : true,
		    	link : function($scope, elem, attrs){
		    		$scope.forChooser = angular.copy($scope.columns);

		    		var hiddenSelect = [],
		    			visibleSelect = [],
		    			updateSelected;

		    		$scope.selectMe = function(status, column){
		    			column.selected = !column.selected;

		    			if(status === 'hidden'){
		    				if(column.selected){
		    					hiddenSelect.push(column);
		    				}else{
		    					hiddenSelect.splice(hiddenSelect.indexOf(column), 1);
		    				}
		    			}else if(status === 'visible'){
		    				if(column.selected){
		    					visibleSelect.push(column);
		    				}else{
		    					visibleSelect.splice(visibleSelect.indexOf(column), 1);
		    				}
		    			}
		    		};

		    		$scope.showHide = function(status){
		    			if(status === 'visible'){
		    				for(var i in hiddenSelect){
		    					$scope.forChooser.visibleColumn[hiddenSelect[i].id] = hiddenSelect[i];
		    					delete $scope.forChooser.hiddenColumn[hiddenSelect[i].id];
		    					delete hiddenSelect[i].selected;
		    				}
		    			}else if(status === 'hidden'){
		    				for(var z in visibleSelect){
		    					$scope.forChooser.hiddenColumn[visibleSelect[z].id] = visibleSelect[z];
		    					delete $scope.forChooser.visibleColumn[visibleSelect[z].id];
		    					delete visibleSelect[z].selected;
		    				}		    				
		    			}
		    		};

		    		$scope.move = function(dir, block){
		    			var blockToUpdate,
		    				item, arrayToProcess = [],
		    				column;
		    			if(block === 'hidden'){
		    				column = 'hiddenColumn';
		    				blockToUpdate = $scope.forChooser.hiddenColumn;
		    				item = hiddenSelect[0].id;
		    				updateSelected = hiddenSelect;
		    			}else{
		    				column = 'visibleColumn';
		    				blockToUpdate = $scope.forChooser.visibleColumn;
		    				item = visibleSelect[0].id;
		    				updateSelected = visibleSelect;
		    			}

		    			arrayToProcess = createArray(blockToUpdate);
		    			applySorting();

		    			function createArray(blockToUpdate){
		    				var tempArr = [];
		    				for(var i in blockToUpdate){
		    					tempArr.push(i);
		    				}
		    				return tempArr;
		    			}

		    			function applySorting(){
		    				var cur_index = arrayToProcess.indexOf(item),
		    					new_index = dir === 'up' ? cur_index-1 : cur_index+1;

		    				var sortedArray = moveInArray(arrayToProcess, cur_index, new_index);
		    				var newColumn = {};
		    				for(var i in sortedArray){
		    					newColumn[sortedArray[i]] = blockToUpdate[sortedArray[i]];
		    				}
		    				blockToUpdate = newColumn;
		    				$scope.forChooser[column] = blockToUpdate;
		    				$scope.forChooser[column].fakeUpdate = {};
		    			}

		    			function moveInArray (arr, cur_index, new_index) {
						    if (new_index >= arr.length) {
						        var k = new_index - arr.length;
						        while ((k--) + 1) {
						            arr.push(undefined);
						        }
						    }
						    arr.splice(new_index, 0, arr.splice(cur_index, 1)[0]);
						    return arr;
						}

		    		};

		    		$scope.applyColumn = function(){
		    			if(updateSelected){
		    				delete updateSelected[0].selected;
		    				delete $scope.forChooser.visibleColumn.fakeUpdate;
		    				delete $scope.forChooser.hiddenColumn.fakeUpdate;
		    			}
		    			visibleSelect = [];
		    			hiddenSelect = [];
		    			$scope.$emit($scope.eventkey+'columnupdate', $scope.forChooser);
		    			$scope.closePopup();
		    		};

		    		$scope.closePopup = function(){
						popupUtils.closePopup(elem[0]);
					};
		    		
		    		popupUtils.popup(elem[0], $scope.closePopup);
		    	}
		    };
	    };	

	}
);

