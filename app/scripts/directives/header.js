define(
	[
		"text!../../templates/header.html",
		"../configs/navigation"
	], 
	function(
		header,
		navigation
	){
    
	    return function(adalAuthenticationService){
	    	return {
		    	template : header,
		    	scope : {},
		    	replace : true,
		    	link : function($scope, elem, attrs){
		    		
		    		var adalAuthService = adalAuthenticationService;

		    		$scope.headerText = attrs.headertext;

   					$scope.userProfile = adalAuthService.userInfo.profile.name;

   					$scope.menuItems = navigation;

   					$scope.goToPage = function(hash){
   						window.location.hash = hash;
   					};

		    		$scope.showBadge = function(ev){
		    			ev.stopPropagation();
		    			$scope.showBadgeVar = !$scope.showBadgeVar;
		    			if($scope.showBadgeVar){
			    			$(elem[0]).find('.login-badge-dropdown').css({height:'118px', opacity:1});
			    		}else{
			    			$(elem[0]).find('.login-badge-dropdown').css({height:0, opacity:0});
			    		}
		    		};

		    		$scope.showMenu = function(ev){
		    			ev.stopPropagation();
		    			$scope.showMenuVar = !$scope.showMenuVar;

		    			var heightToShow;
		    			if(window.outerWidth < 800){
							heightToShow = '183px';
						}else{
							heightToShow = '148px';
						}

		    			if($scope.showMenuVar){
			    			$(elem[0]).find('.main-menu-item').css({height:heightToShow, opacity:1});
			    		}else{
			    			$(elem[0]).find('.main-menu-item').css({height:0, opacity:0});
			    		}
		    		};

		    		$scope.logout = function(){
		    			adalAuthService.logOut();
		    		};

		    		$scope.preventEvent = function(ev){
		    			ev.stopPropagation();
		    		};

		    		$(document).on('click', function(){
		    			$scope.showBadgeVar = null;
		    			$scope.showMenuVar = null;
		    			$scope.$apply();
		    			$(elem[0]).find('.login-badge-dropdown').css({height:0, opacity:0});
		    			$(elem[0]).find('.main-menu-item').css({height:0, opacity:0});
		    		});
		    	}
		    };
	    };	

	}
);