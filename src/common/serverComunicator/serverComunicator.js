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

			model.changePass = function(password,token) {
				return $http({
					method: 'PUT',
					data: {
						"password": password,
					},
					url: endpoint + 'User' + '/NewPassword/' + token,
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

			model.deleteDeliveryItem = function(idItem, idUser) {
				return $http({
					method: 'DELETE',
					url: endpoint + 'DeliveryItem/Delete' + "/" + idItem + "/" + idUser,
				});
			};

			model.restartDeliveryItem = function(idItem, idUser) {
				return $http({
					method: 'PUT',
					data: {
						"user_id": idUser,

					},
					url: endpoint + 'DeliveryItem/Restart' + "/" + idItem,
				});
			};

			model.updateProfile = function(idUser, name, lastname, mobilephone) {
				return $http({
					method: 'PUT',
					data: {
						"name": name,
						"lastname": lastname,
						"mobilephone": mobilephone,

					},
					url: endpoint + 'User/Update' + "/" + idUser,
				});
			};

			model.changePassword = function(idUser, oldPass, newPass) {
				return $http({
					method: 'PUT',
					data: {
						"password": oldPass,
						"new_password": newPass,

					},
					url: endpoint + 'User/Password' + "/" + idUser,
				});
			};

			model.getActiveDeliveryItems = function(idUser) {
				return $http({
					method: 'GET',
					url: endpoint + 'DeliveryItem/UserActive' + "/" + idUser,
				});
			};

			model.getCompletedDeliveryItems = function(idUser) {
				return $http({
					method: 'GET',
					url: endpoint + 'User/FinishedDeliveries' + "/" + idUser,
				});
			};

			model.getAbortedDeliveryItems = function(idUser) {
				return $http({
					method: 'GET',
					url: endpoint + 'DeliveryItem/UserAborted' + "/" + idUser,
				});
			};

			model.ratingMessenger = function(idItem,idUser,numberStars,review) {
				return $http({
					method: 'PUT',
					data: {
						"user_id": idUser,
						"rating": numberStars,
						"review": review,

					},
					url: endpoint + 'DeliveryItem/Rate' + "/" + idItem,
				});
			};

		}
	}]);

}(angular.module("appMensajeria.serverComunicator", [])));