define([

	'angular',
	'components/alerter/alerter',
	'properties', 
	'angularMocks'
], 
function(
	angular,
	alerter,
	properties
) {

	describe('Login AD Controller Test', function(){
		
		
		it('Testing Setup : buildALert()', function(){
			alerter.buildAlert(["Test", "My paragrph"], 'alert');
			expect(document.getElementById('alerter').querySelector('h4').innerHTML).toBe('Test');
		});

		it('Testing Setup : alert()', function(){
			alerter.alert(["Test", "My paragrph"], 'alert');
			expect(document.getElementById('alerter').querySelector('.ico-alert').getAttribute('class')).toBe('ico-alert ico-alert-alert');
		});

		it('Testing Setup : warn()', function(){
			alerter.warn(["Test", "My paragrph"], 'warn');
			expect(document.getElementById('alerter').querySelector('.ico-alert').getAttribute('class')).toBe('ico-alert ico-alert-warn');
		});

		it('Testing Setup : prompt()', function(){
			alerter.prompt(["Test", "My paragrph"], 'prompt');
			expect(document.getElementById('alerter').querySelector('.ico-alert').getAttribute('class')).toBe('ico-alert ico-alert-prompt');
		});

		it('Testing Setup : error()', function(){
			alerter.error(["Test", "My paragrph"], 'error');
			expect(document.getElementById('alerter').querySelector('.ico-alert').getAttribute('class')).toBe('ico-alert ico-alert-error');
		});

		it('Testing Setup : notification()', function(){
			alerter.notification(["Test", "My paragrph"], 'notification');
			expect(document.getElementById('alerter').querySelector('.ico-alert').getAttribute('class')).toBe('ico-alert ico-alert-notification');
		});

		it('Testing Setup : on()', function(){
			alerter.on('abc', 'str');
		});


	});

});