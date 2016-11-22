define([

	'angular',
	'controllers/loginAD', 
	'properties',
	'angularMocks'
], 
function(
	angular,
	homeCtrl,
	properties
) {

	describe('Login AD Controller Test logged IN view', function(){
		var scope, ctrl, httpCalls, adalAuthenticationService, httpBackend;

		beforeEach(inject(function($controller, $rootScope, $httpBackend) {
			scope = $rootScope.$new();
			httpBackend = $httpBackend;

			scope.userInfo = {
				isAuthenticated : true,
				userName: 'rahul.ranjan@markit.com',
				profile:{
					name : 'Rahul Ranjan'
				}
			}

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

			httpBackend.when('POST', properties.user).respond({success:true})

			httpCalls.user = function(params, headers, callback){
				callback({data: 'something'});
			}

			ctrl = $controller(homeCtrl, { $scope: scope, httpCalls:httpCalls, adalAuthenticationService:adalAuthenticationService() });
		}));

		it('Check able to Login', function() {
			expect(window.lcation).toBe(undefined);
			scope.loginMe();
			ctrl.saveToken();
			httpBackend.expectPOST(properties.user);
			expect(window.location.hash).toBe('#/Summary');
		});
	});

});