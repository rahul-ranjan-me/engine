define([

	'angular',
	'controllers/loginAD', 
	'angularMocks'
], 
function(
	angular,
	homeCtrl
) {

	describe('Login AD Controller Test logged out view', function(){
		var scope, ctrl, httpCalls, adalAuthenticationService;

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			scope.userInfo = {
				isAuthenticated : false
			};
			
			adalAuthenticationService = function() {
				return {
					login: function(){
						scope.userInfo = {
							isAuthenticated : true,
							userName: 'rahul.ranjan@markit.com',
							profile:{
								name : 'Rahul Ranjan'
							}
						}
					},
					logout: function(){
						scope.userInfo = {
							isAuthenticated : false
						};
					}
				}
			};

			httpCalls = {};

			httpCalls.user = function(params, headers, callback){
				callback({data: 'something'});
			}

			ctrl = $controller(homeCtrl, { $scope: scope, httpCalls:httpCalls, adalAuthenticationService:adalAuthenticationService() });
		}));

		it('Check able to Login', function() {
			expect(scope.userInfo.isAuthenticated).toBe(false);
			scope.loginMe();
			expect(scope.userInfo.isAuthenticated).toBe(true);
		});
	});

});