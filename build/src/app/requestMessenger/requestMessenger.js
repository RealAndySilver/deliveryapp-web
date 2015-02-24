(function(module) {

	module.controller('RequestMessengerController', function() {
		var model = this;

		init();

		function init() {
			/*var x = document.getElementById("geo-cositas");

			model.getLocation = function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(model.showPosition);
				} else {
					x.innerHTML = "Geolocation is not supported by this browser.";
				}
			};

			model.showPosition = function(position) {
				x.innerHTML = "Latitude: " + position.coords.latitude +
					"<br>Longitude: " + position.coords.longitude;
			};*/

			model.requestMessenger = function() {
				console.log('objeto servicio ', model.user);
			};
		}
	});

}(angular.module("appMensajeria.requestMessenger")));