define([

], function(

) {
	return function($parse, $q) {

		var contextMenus = [];
		var removeContextMenus = function(level) {
			while (contextMenus.length && (!level || contextMenus.length > level)) {
				contextMenus.pop().remove();
			}
			if (contextMenus.length === 0 && $currentContextMenu) {
				$currentContextMenu.remove();
			}
		};

		var $currentContextMenu = null;

		var renderContextMenu = function($scope, event, options, model, level) {

			if (!level) {
				level = 0;
			}

			$(event.currentTarget).addClass('context');
			var $contextMenu = $('<div>');
			if ($currentContextMenu) {
				$contextMenu = $currentContextMenu;
			} else {
				$currentContextMenu = $contextMenu;
			}
			$contextMenu.addClass('dropdown clearfix context-menu');
			var $ul = $('<ul>');
			$ul.addClass('dropdown-menu');
			$ul.css({
				display : 'block',
				position : 'absolute',
				left : event.pageX + 'px',
				top : event.pageY + 'px',
				"z-index" : 10000
			});
			angular.forEach(options, function(item, i) {
				var $li = $('<li>');
				if (item === null) {
					$li.addClass('divider');
				} else {

					var $a = $('<a>');
					
					$a.attr({
						href : '#'
					});
					var text = typeof item[0] == 'string' ? item[0] : item[0]
							.call($scope, $scope, event, model);
					$q.when(text).then(function(text) {
						$a.text(text);

					});
					$li.append($a);

					var enabled = angular.isFunction(item[2]) ? item[2].call(
							$scope, $scope, event, model, text) : true;
					if (enabled) {
						$li.on('click', function($event) {

							$event.preventDefault();
							$scope.$apply(function() {

								$(event.currentTarget).removeClass('context');
								removeContextMenus();
								item[1].call($scope, $scope, event, model);

							});
						});

					}
				}
				$li.addClass('ui-menu-item');
				$ul.append($li);
			});
			$contextMenu.append($ul);
			var height = Math.max(document.body.scrollHeight,
					document.documentElement.scrollHeight,
					document.body.offsetHeight,
					document.documentElement.offsetHeight,
					document.body.clientHeight,
					document.documentElement.clientHeight);
			$contextMenu.css({
				width : '100%',
				height : height + 'px',
				position : 'absolute',
				top : 0,
				left : 0,
				zIndex : 9999

			});
			$(document).find('body').append($contextMenu);
			$contextMenu.on("mousedown", function(e) {
				if ($(e.target).hasClass('dropdown')) {
					$(event.currentTarget).removeClass('context');
					removeContextMenus();
				}
			}).on('contextmenu', function(event) {

				$(event.currentTarget).removeClass('context');
				event.preventDefault();
				removeContextMenus(level);
			});
			$scope.$on("$destroy", function() {
				removeContextMenus();
			});

			contextMenus.push($ul);
		};
		return function($scope, element, attrs) {

			if ($scope.$eval(attrs.contextMenu) !== undefined) {
				element.on('contextmenu', function(event) {
					event.stopPropagation();
					
					$('li').removeClass('selected');
					$(event.currentTarget).addClass('selected');

					$scope.$apply(function() {
						event.preventDefault();
						var options = $scope.$eval(attrs.contextMenu);
						var model = $scope.$eval(attrs.model);
						if (options instanceof Array) {
							if (options.length === 0) {
								return;
							}
							renderContextMenu($scope, event, options, model);
						} else {
							throw '"' + attrs.contextMenu + '" not an array';
						}
					});

				});
			}
		};
	};

});