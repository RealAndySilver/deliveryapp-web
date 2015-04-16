(function(module) {

	module.service('ServerComunicator', ['$http', function($http) {
		var model = this;
		var endpoint = "http://192.241.187.135:2000/api_1.0/";
		//var endpoint = "http://local.andres/api_1.0/";

		init();

		function init() {

			model.login = function(email, password) {
				return $http({
					method: 'PUT',
					data: {
						email: email,
						password: password,
					},
					url: endpoint + 'User' + '/Login',
				});
			};

			model.register = function(name, lastname, email, password, mobilephone) {
				return $http({
					method: 'POST',
					data: {
						name: name,
						lastname: lastname,
						email: email,
						password: password,
						mobilephone: mobilephone,
					},
					url: endpoint + 'User' + '/Create',
				});
			};

			model.recoverPassword = function(email) {
				return $http({
					method: 'GET',
					data: email,
					url: endpoint + 'User' + '/Recover/' + email,
				});
			};

			model.requestMessenger = function(delivery) {
				return $http({
					method: 'POST',
					data: delivery,
					url: endpoint + 'DeliveryItem' + '/Create',
				});
			};

			model.getPrice = function(loc1, loc2) {
				return $http({
					method: 'GET',
					data: {
						loc1: loc1,
						loc2: loc2,
					},
					url: endpoint + 'GetPrice' + "/" + loc1 + "/" + loc2,
				});
			};

			model.getDeliveryItemDetails = function(id) {
				return $http({
					method: 'GET',
					url: endpoint + 'DeliveryItem' + "/" + id,
				});
			};

		}
	}]);

}(angular.module("appMensajeria.serverComunicator", [])));