define([
		'../components/alerter/alerter'
	], 
	function(
		alerter
	) {
		
	    function LoginCtrl($scope, httpCalls, adalAuthenticationService, commonUtils){
	    	this.$scope = $scope;
	    	this.httpCalls = httpCalls;
	    	this.adalService = adalAuthenticationService;
	    	this.commonUtils = commonUtils;
	    	this.adal = '';

	    	this.scopeBindedMethod();
	    	
		}

	    LoginCtrl.prototype.scopeBindedMethod = function(){
	    	this.$scope.loginMe = function(){
	    		this.adalService.login();
		    }.bind(this);
		    if(this.$scope.userInfo.isAuthenticated){
    			this.saveToken();
	    	}
	    };

	    LoginCtrl.prototype.saveToken = function(){
	    	var params = {
	    		emailId : this.$scope.userInfo.userName,
	    		name : this.$scope.userInfo.profile.name
	    	},
	    	callbackFunc = function(){
	    		window.location.hash = '/Summary';
	    	};

	    	this.commonUtils.makeUserCalls(params, callbackFunc);	    	
	    };

	    return LoginCtrl;
	}
);