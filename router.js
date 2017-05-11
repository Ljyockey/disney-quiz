$(function() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		window.location.assign('localhost:8080/twitter');
		$.get('/twitter', function() {

		});	
});
});