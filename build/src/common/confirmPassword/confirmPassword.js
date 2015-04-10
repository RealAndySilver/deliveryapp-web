(function(module) {

	module.directive('confirmPassword', function() {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function(scope, elem, attrs, ngModel) {
				if (!ngModel) {
					return;
				}

				// Verifica el valor del campo y lo valida si este cambia
				scope.$watch(attrs.ngModel, function() {
					validate();
				});

				// Verifica el valor a confirmar y lo valida si este cambia
				attrs.$observe('confirmPassword', function(val) {
					validate();
				});

				var validate = function() {
					//Valores de campos de contraseña
					var val1 = ngModel.$viewValue;
					var val2 = attrs.confirmPassword;

					// Validación de campos de contraseña
					ngModel.$setValidity('confirmPassword', !val1 || !val2 || val1 === val2);
				};
			}
		};
	});

}(angular.module("appMensajeria.confirmPassword", [])));