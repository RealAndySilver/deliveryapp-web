(function(module) {

	module.service('RatingMessengerService', ['ServerComunicator', function(ServerComunicator) {
		var model = this;

		init();

		function init() {

			model.ratingMessenger = function(idItem,idUser,numberStars,review, callback) {
				var detailsPromise = ServerComunicator.ratingMessenger(idItem,idUser,numberStars,review);
				detailsPromise.then(
					function success(response) {
						callback({
							response: response.data.status,
							msg: response.data.message,
							data: response.data.response,
						});
					},
					function error(e) {
						callback({
							response: false,
							msg: response.data.message,
							error: e,
						});
					});
			};

		}
	}]);

}(angular.module("appMensajeria.ratingMessenger")));