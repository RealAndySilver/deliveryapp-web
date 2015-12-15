(function(module) {

	var urlList = {
		"service": "http://192.241.187.135:2000/api_1.0/",
		"local": "http://andres.local:2000/api_1.0/"
	};

	module.service('ServerComunicator', ['$http', function($http) {
		var model = this;
		var endpoint = urlList.service;
		//var endpoint = "http://andres.local:2000/api_1.0/";

		init();

		//NI LOGIN NI CREATE PIDEN HEADER
		function getHeader() {
			var email = sessionStorage.getItem('email');
			var pass = sessionStorage.getItem('pass');
			//pass = "bbb";
			var token = sessionStorage.token;
			console.log("Token from local ", token);
			return {
				type: 'user',
				Authorization: 'Basic ' + btoa(email + ':' + pass),
				token: token
			};
			/*
				Si en msj llega a1 se cierra sesion y se manda a login
				a1=path out
				a2=session expired
				a3=
			*/
		}

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

			//User/Logout/:userid   SI ES EXITOSO EL LOG OUT MANDO A LOGIN
			model.logout = function() {
				//traer el id
				var id=sessionStorage.id;
				return $http({
					method: 'PUT',
					headers: getHeader(),
					url: endpoint + 'User' + '/Logout'+"/"+id,

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

			model.changePass = function(password, token) {
				return $http({
					method: 'PUT',
					data: {
						"password": password,
					},
					headers: getHeader(),
					url: endpoint + 'User' + '/NewPassword/' + token,
				});
			};



			model.requestMessenger = function(delivery) {
				return $http({
					method: 'POST',
					data: delivery,
					headers: getHeader(),
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
					headers: getHeader(),
					url: endpoint + 'GetPrice' + "/" + loc1 + "/" + loc2,
				});
			};

			model.getDeliveryItemDetails = function(id) {
				return $http({
					method: 'GET',
					headers: getHeader(),
					url: endpoint + 'DeliveryItem' + "/" + id,
				});
			};

			model.deleteDeliveryItem = function(idItem, idUser) {
				return $http({
					method: 'DELETE',
					headers: getHeader(),
					url: endpoint + 'DeliveryItem/Delete' + "/" + idItem + "/" + idUser,
				});
			};

			model.restartDeliveryItem = function(idItem, idUser) {
				return $http({
					method: 'PUT',
					data: {
						"user_id": idUser,

					},
					headers: getHeader(),
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
					headers: getHeader(),
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
					headers: getHeader(),
					url: endpoint + 'User/Password' + "/" + idUser,
				});
			};

			model.getActiveDeliveryItems = function(idUser) {
				return $http({
					method: 'GET',
					headers: getHeader(),
					url: endpoint + 'DeliveryItem/UserActive' + "/" + idUser,
				});
			};

			model.getCompletedDeliveryItems = function(idUser) {
				return $http({
					method: 'GET',
					headers: getHeader(),
					url: endpoint + 'User/FinishedDeliveries' + "/" + idUser,
				});
			};

			model.getAbortedDeliveryItems = function(idUser) {
				return $http({
					method: 'GET',
					headers: getHeader(),
					url: endpoint + 'DeliveryItem/UserAborted' + "/" + idUser,
				});
			};

			model.ratingMessenger = function(idItem, idUser, numberStars, review) {
				return $http({
					method: 'PUT',
					data: {
						"user_id": idUser,
						"rating": numberStars,
						"review": review,

					},
					headers: getHeader(),
					url: endpoint + 'DeliveryItem/Rate' + "/" + idItem,
				});
			};

			model.newPassFromUrl = function(pass, token) {
				return $http({
					method: 'PUT',
					data: {
						"password": pass,

					},
					url: endpoint + "User/NewPassword/"  + token,
				});
			};

		}
	}]);

}(angular.module("appMensajeria.serverComunicator", [])));