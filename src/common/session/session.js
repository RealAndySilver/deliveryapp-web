(function(module) {

	module.service('Session', ['$http', 'User', function($http, User) {
		var model = this;

		init();

		function init() {

			model.setUser = function(user) {
				localStorage.setItem('user', JSON.stringify(user));
			};

			model.getUser = function() {
				if (!localStorage.getItem("user")) {
					return User;
				}

				var user = JSON.parse(localStorage.getItem("user"));
				User = user;

				return User;
			};

		}
	}]);

}(angular.module("appMensajeria.session", [])));