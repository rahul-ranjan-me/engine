define(
	[
		"lodash",
		"text!../../../templates/grid.html"
	], 
	function(
		_,
		grid
	){
    
	    return function($filter, $rootScope, $timeout, $compile, userService){
	    	return {
		    	template : grid,
		    	scope : {
		    		grid : '=',
		    		params : '=',
		    		callserver : '&',
		    		rowselect : '&',
		    		columnchooser : '='
		    	},
		    	require: '?ngModel',
		    	link : function($scope, elem, attrs){
		    		var headers = $scope.grid.headerData,
		    			gridItems = $scope.grid.grid,
		    			buttons = $scope.grid.buttons,
		    			totalRecordsGrid =  $scope.grid.totalRecords;
		    			freezedItems = angular.copy(gridItems),
		    			freezedHeaders = angular.copy(headers),
		    			allPages = []
		    			calcWidth = true;
		    			pagesize = parseInt(attrs.pagesize),
		    			prevSelected = false,
		    			curSelected = false,
		    			selectedItem = [];		    			

		    			$scope.eventkey = attrs.eventkey;
		    			$scope.nodata = attrs.nodata;
		    			$scope.curPage = 0;
						$scope.pagePos = attrs.pagepos;
		    			$scope.view = attrs.view;
		    			$scope.switchView = attrs.switchview;
		    			$scope.userPaging = pagesize;
		    			$scope.columnCount = attrs.columncount;
		    			$scope.collapsible = attrs.collapsible;
		    			
		    			$scope.serverInt = attrs.serverint;
		    			$scope.server = attrs.server;
		    			$scope.pageArray = [];
		    			$scope.gridWidth = 0;
		    			$scope.menuOptions = $scope.grid.menuOptions;

		    		var userSavedConfig = userService.get($scope.eventkey);

					if(userSavedConfig){
						var toUseSavedConfig = true;
						for(var i in headers){
							if(!userSavedConfig[i]){
								toUseSavedConfig = false;
								break;
							}
						}

						headers = toUseSavedConfig ? userSavedConfig : $scope.grid.headerData;
					}

		    		/* ****************************************************************
		    			Condition to handle mobile view
					***************************************************************** */

					if(window.outerWidth < 800){
						$scope.columnCount = 1;
						$scope.mobile = true;
						$scope.view = "list";
					}else{
						$scope.mobile = false;
					}

					/* Condition to handle mobile view ends here */

					var setupGridHeaders = function(){
						var columns = {
							visibleColumn : {},
							hiddenColumn : {}
						};

						for(var i in headers){
							if(headers[i].visible === true || headers[i].visible === undefined){
								columns.visibleColumn[i] = headers[i];
							}else{
								columns.hiddenColumn[i] = headers[i];
							}
						}
						$scope.columns = columns;
						$scope.grid.headerData = columns.visibleColumn;
						headers = columns.visibleColumn;
					};

					setupGridHeaders();

					$scope.columnChooser = function(){
						$('body').append($compile("<column-chooser griddata='grid' />")($scope));
					}

					$scope.buttonClickEvent = function(event, row){
						$scope.$emit(event, row);
					}


		    		/* ****************************************************************
		    			This for loop will be called during the first rendering 
		    			of this directive to sort on load
					***************************************************************** */
		    		
		    		$scope.changeView = function(view){
		    			$scope.view = view;
		    		}

		    		$scope.itemsPerPage = function(args){
		    			pagesize = parseInt(args);
		    			$scope.curPage = 0;
		    			createPage();
		    		}

		    		$scope.collapseExpand = function(ev, row){
		    			ev.stopPropagation();
		    			row.expand = !row.expand;
		    		}


$scope.calcStyle = function(width, align){
	return {
		'width': width,
		'text-align' : align
	}
};

		    		$scope.clientSelect = function(ev, row){
		    			if(!row.freezed && !attrs.noselect){

			    			if(!curSelected){
			    				curSelected = row;
			    				prevSelected = row;
			    			}else{
			    				prevSelected = curSelected;
			    				curSelected = row;
			    			}

			    			if(ev.ctrlKey && curSelected.selected === true){
			    	
			    				curSelected.selected = false;
			    				selectedItem.splice(row, 1);
			    	
			    			}else if(ev.ctrlKey){
			    	
			    				curSelected.selected = true;
			    				prevSelected.selected = true;
			    				selectedItem.push(row);
			    	
			    			}else if(ev.shiftKey){
			    	
			    				var indexCurSel = gridItems.indexOf(curSelected),
			    					indexPrevSel = gridItems.indexOf(prevSelected),
			    					startIndex,
			    					endIndex;

			    				if(indexCurSel < indexPrevSel){
			    					startIndex = indexCurSel;
			    					endIndex = indexPrevSel;
			    				}else{
			    					startIndex = indexPrevSel;
			    					endIndex = indexCurSel;
			    				}

			    				for(var i = startIndex; i <= endIndex; i++){
			    					gridItems[i].selected = true;
			    					if(i !== startIndex){
			    						selectedItem.push(gridItems[i]);
			    					}
			    				}

							}else{
							
								for(var i=0;i<selectedItem.length;i++){
									selectedItem[i].selected = false;
								}

								row.selected = true;
								selectedItem = [];
								selectedItem.push(row);
			    			
			    			}
			    			
			    			$scope.rowselect({row: selectedItem});
			    			
			    		}
		    		}

		    		

		    		/* ***********************************************
		    			Sorting on cloumn click
					************************************************ */

		    		$scope.sortMe = function(item){
		    			if(item.sort){

		    				if(item.direction ==='asc'){
		    					item.direction = 'desc';
		    				}else{
		    					item.direction = 'asc';
		    				}

		    				if($scope.server){
		    					$scope.makeParams({sortKey: item.id, direction: item.direction}, null, 'sort');
		    				}else{
			    				gridItems = (sorting(gridItems, item.id, item.direction));
			    				$scope.curPage = 0;
			    				createPage();
			    			}

		    				for(var i in headers){
			    				if (item.id !== headers[i].id){
			    					delete headers[i].direction;
			    				}
			    			}

		    			}

		    		}

		    		/* ***********************************************
		    			Search through data
		    			- Generates a query for server side
		    			- Filter data for client side
					************************************************ */
		    		$scope.search = function(search){
		    			if($scope.server){
		    				$scope.makeParams(search, null, 'search');
		    			}else{
		    				gridItems = $filter('filter')(freezedItems, search);
		    				createPage();
			    		}
		    		}

		    		/* ***********************************************
		    			Pagination navigation 
					************************************************ */
		    		$scope.updatePage = function(i, ev){
		    			if(ev) ev.preventDefault();
		    			$scope.curPage = i;
		    			$scope.pageToShow = allPages[$scope.curPage];
		    		}

		    		$scope.prev = function(ev){
		    			ev.preventDefault();
		    			if($scope.curPage>0){
		    				$scope.curPage -= 1;
		    				$scope.pageToShow = allPages[$scope.curPage];
		    			}
		    		}

		    		$scope.next = function(ev){
		    			ev.preventDefault();
		    			if($scope.curPage<allPages.length-1){
		    				$scope.curPage += 1;
		    				$scope.pageToShow = allPages[$scope.curPage];
		    			}
		    		}

		    		/* ****************
		    			Sorting on data load
										**************** */

					function doSortonLoad(){

						var widthUnit = 'px';
						for(var i in headers){
			    			if(headers[i].sorted){
			    				gridItems = (sorting(gridItems, headers[i].id, headers[i].sorted));
			    				headers[i].direction = headers[i].sorted;
			    			}
			    			if(calcWidth){
			    				widthUnit = headers[i].width.indexOf('%') !== -1 ? '%' : 'px';
								$scope.gridWidth += parseInt(headers[i].width.split(widthUnit)[0]);
			    			}
			    		}

			    		if($scope.collapsible && calcWidth){
			    			$scope.gridWidth += 20;	
			    		}
			    		
			    		if(calcWidth){
			    			$scope.widthUnit = widthUnit;
			    		}
			    		calcWidth = false;
			    		createPage();
					}

					/* ****************
		    			Client side paging of items
										**************** */
					function createPage(arg){
						var pages = [],
							page = [],
							item = 0;
						for(var i = 0; i < gridItems.length; i++){
							
							item = item+1;
							page.push(gridItems[i]);

							if(item === pagesize || i === gridItems.length-1){
								pages.push(page);
								item = 0;
								page = [];
							}
						}

						allPages = pages;
						$scope.pages = pages;
						$scope.pageToShow = pages[0];

						if($scope.serverInt){
							$scope.currentPage = $scope.params.page;
							createServerPage(totalRecordsGrid, 100);
						}
					}


					/* ****************
		    			Server side interaction methods starts here
									**************** */


					var sortingObj = {};

					if($scope.server){
						renderFromServer();
					}else{
						$scope.$on(attrs.eventkey, function (event, args) {
							gridItems = args.grid;
							freezedItems = angular.copy(gridItems);
							$scope.curPage = 0;
							totalRecordsGrid =  $scope.grid.totalRecords;

							doSortonLoad();
						});

						$scope.$on(attrs.eventkey+'columnupdate', function (event, args) {
							$scope.gridWidth = 0;
							calcWidth = true;
							$scope.columns = args;
							$scope.grid.headerData = args.visibleColumn;
							headers = args.visibleColumn;
							
							manageColumnStorage(args);
							doSortonLoad();
						});

						doSortonLoad();
					}

					function manageColumnStorage(args){
						var visibleColumn = args.visibleColumn,
							hiddenColumn = args.hiddenColumn;
						for(var i in visibleColumn){
							visibleColumn[i].visible = true;
						}
						for(var i in hiddenColumn){
							hiddenColumn[i].visible = false;
						}

						var saveSetting = _.merge({}, args.visibleColumn, args.hiddenColumn);
						userService.set($scope.eventkey, saveSetting);
					}

					function createServerPage(totalRecords, pagesize){
						$scope.pageArray = [];
						var indices = (totalRecords/pagesize);
						
						for(var i=0; i<indices; i++){
							$scope.pageArray.push(i);
						}
					}

					function renderFromServer(){
						sortingObj.sortKey = $scope.params.sortKey;
						sortingObj.direction = $scope.params.sortDirection;
						$scope.currentPage = $scope.grid.currentPage;

						if($scope.server){
							$scope.$on(attrs.eventkey, function (event, args) {
								pagesize = args.grid.pageSize;
								gridItems = args.grid.grid;
								$scope.currentPage = args.grid.currentPage;
								doSortonLoad();
								createServerPage($scope.grid.totalRecords, args.grid.pageSize);
								$scope.curPage = 0;
							});
						}
					}


					$scope.makeParams = function(data, ev, event){
						if(ev){ev.preventDefault();}

						if(event === 'page'){
							$scope.params.page = data;
							$scope.currentPage = $scope.params.page;
							calcStartPoint();
						}else if(event === 'prev'){
							$scope.params.page = data-1;
							$scope.currentPage = $scope.params.page;
							calcStartPoint();
						}else if(event === 'next'){
							$scope.params.page = data+1;
							$scope.currentPage = $scope.params.page;
							calcStartPoint();
						}else if(event === 'search'){
							$scope.params.search = data;
						}else if(event === 'sort'){
							if(sortingObj.sortKey !== data.sortKey){
								delete headers[sortingObj.sortKey].sorted;
								delete headers[sortingObj.sortKey].direction;
								sortingObj.sortKey = data.sortKey;
								sortingObj.direction = data.sortDirection;
							}
							$scope.params.sortKey = data.sortKey;
							$scope.params.sortDirection = data.direction;
						}

						$scope.callserver($scope.params);
					}

					function calcStartPoint(page, dir){
						if($scope.params.page%9 === 0){
							if($scope.pageArray.length-1 === $scope.params.page){
								$scope.params.beginPoint = $scope.params.page-9;
							}else{
								$scope.params.beginPoint = $scope.params.page;
							}
						}else if($scope.params.page < $scope.params.beginPoint){
							if($scope.params.page <= 8){
								$scope.params.beginPoint = 0;
							}else{
								$scope.params.beginPoint = $scope.params.page-9;
							}
						}						
					}

					/* ****************
		    			Server side interaction methods ends here
									**************** */

		    		/* ****************
		    			Generic sorting function
									**************** */

		    		function sorting(data, item, direction){
		    			return _.orderBy(data, [item], [direction]);
		    		}
		    		
		    	}
		    };
	    };	

	}
);