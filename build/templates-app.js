angular.module('templates-app', ['about/about.tpl.html', 'createUser/createUser.tpl.html', 'home/home.tpl.html', 'loginUser/loginUser.tpl.html', 'requestMessenger/requestMessenger.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<h1>About</h1>\n" +
    "\n" +
    "<p>This is what this is about.</p>");
}]);

angular.module("createUser/createUser.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("createUser/createUser.tpl.html",
    "<div layout=\"column\" layout-align=\"center center\" class=\"solo-box\">\n" +
    "	<md-card class=\"basic-form\">\n" +
    "		<div>\n" +
    "			<md-toolbar>\n" +
    "			    <div class=\"md-toolbar-tools\" layout-align=\"center center\">\n" +
    "			    	<span class=\"md-flex\">Registro</span>\n" +
    "			    </div>\n" +
    "			  </md-toolbar>\n" +
    "		</div>\n" +
    "	    <div>\n" +
    "			<form name=\"registerForm\" ng-submit=\"model.createUser()\" novalidate>\n" +
    "				<md-input-container flex>\n" +
    "					<label>Nombre</label>\n" +
    "	            	<input name=\"name\" ng-model=\"model.user.name\" required>\n" +
    "	        	</md-input-container>\n" +
    "	        	<md-input-container flex>\n" +
    "					<label>Apellido</label>\n" +
    "	            	<input name=\"lastname\" ng-model=\"model.user.lastname\" required>\n" +
    "	        	</md-input-container>\n" +
    "				<md-input-container flex>\n" +
    "					<label>Correo electrónico</label>\n" +
    "	            	<input name=\"email\" ng-model=\"model.user.email\" required>\n" +
    "	        	</md-input-container>\n" +
    "	        	<md-input-container flex>\n" +
    "					<label>Contraseña</label>\n" +
    "	            	<input type=\"password\" name=\"password\" ng-model=\"model.user.password\" required>\n" +
    "	        	</md-input-container>\n" +
    "	        	<md-input-container flex>\n" +
    "					<label>Confirmar contraseña</label>\n" +
    "	            	<input type=\"password\" name=\"confirm_password\" ng-model=\"model.user.password_verify\" data-password-verify=\"model.user.password\" confirmPassword=\"{{model.user.password}}\" required>\n" +
    "	            	<div class=\"error\" ng-show=\"registerForm.password.$dirty && registerForm.last_name.$invalid\">\n" +
    "						<small class=\"error\" ng-show=\"registerForm.confirm_password.$error.confirmPassword\">Las contraseñas no coinciden.</small>\n" +
    "					</div>\n" +
    "	        	</md-input-container>\n" +
    "	        	<md-input-container flex>\n" +
    "					<label>Celular</label>\n" +
    "	            	<input name=\"mobilephone\" ng-model=\"model.user.mobilephone\" required>\n" +
    "	        	</md-input-container>\n" +
    "	        	<md-input-container flex>\n" +
    "	        		<md-button class=\"md-raised primary-btn\">Aceptar</md-button>\n" +
    "	        		<md-button class=\"md-raised md-warn\" ng-click=\"model.cancel()\">Cancelar</md-button>\n" +
    "	        	</md-input-container>\n" +
    "			</form>\n" +
    "	    </div>\n" +
    "	    <md-divider></md-divider>\n" +
    "	    <md-card>	\n" +
    "			<span>Al registrarte en MensajeriApp, tu aceptas nuestros <a href=\"\">Términos y Condiciones</a>. Tus datos estan bajo política de privacidad.</span>\n" +
    "		</md-card>\n" +
    "	</md-card>\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<h1>Home of App mensajeria</h1>\n" +
    "\n" +
    "<p>Code it up</p>\n" +
    "\n" +
    "<p>\n" +
    "    <span ng-bind=\"model.someVar\" />\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"item in model.someList\">{{item}}</li>\n" +
    "    </ul>\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"model.someFunctionUsedByTheHomePage()\">Click Me</button>\n" +
    "</p>");
}]);

angular.module("loginUser/loginUser.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("loginUser/loginUser.tpl.html",
    "<div layout=\"column\" layout-align=\"center center\" class=\"solo-box\">\n" +
    "	<md-card class=\"basic-form\">\n" +
    "		<div>\n" +
    "			<md-toolbar>\n" +
    "			    <div class=\"md-toolbar-tools\" layout-align=\"center center\">\n" +
    "			    	<span class=\"md-flex\">Iniciar Sesión</span>\n" +
    "			    </div>\n" +
    "			  </md-toolbar>\n" +
    "		</div>\n" +
    "	    <div>\n" +
    "			<form name=\"loginForm\" ng-submit=\"model.loginUser()\" novalidate>\n" +
    "				<md-input-container flex>\n" +
    "					<label>Correo electrónico</label>\n" +
    "	            	<input name=\"email\" ng-model=\"model.user.email\" required>\n" +
    "	            	<!-- <div ng-messages=\"loginForm.email.$error\">\n" +
    "			          	<div ng-message=\"required\">Este campo es requerido.</div>\n" +
    "			        </div> -->\n" +
    "	        	</md-input-container>\n" +
    "	        	<md-input-container flex>\n" +
    "					<label>Contraseña</label>\n" +
    "	            	<input type=\"password\" name=\"password\" ng-model=\"model.user.password\" required>\n" +
    "	            	<!-- <div ng-messages=\"loginForm.password.$error\">\n" +
    "			        	<div ng-message=\"required\">Este campo es requerido.</div>\n" +
    "			        </div> -->\n" +
    "	        	</md-input-container>\n" +
    "	        	<!-- <div class=\"error warning\" ng-show=\"loginForm.$invalid\">\n" +
    "				    <small class=\"error warning\">Recuerda diligenciar todo el formulario para poder ingresar.</small>\n" +
    "				</div> -->\n" +
    "	        	<md-input-container flex>\n" +
    "	        		<md-button class=\"md-raised primary-btn\">Ingresar</md-button>\n" +
    "	        	</md-input-container>\n" +
    "			</form>\n" +
    "	    </div>\n" +
    "	    <md-divider></md-divider>\n" +
    "	    <md-button class=\"md-primary v-margin-btn\">¿Olvidaste tu contraseña?</md-button>\n" +
    "	    <md-divider></md-divider>\n" +
    "	    <md-button class=\"md-raised v-margin-btn\" ng-click=\"model.newAccount()\">Crear nueva cuenta</md-button>\n" +
    "	</md-card>\n" +
    "</div>\n" +
    "");
}]);

angular.module("requestMessenger/requestMessenger.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("requestMessenger/requestMessenger.tpl.html",
    "<div layout=\"column\" layout-align=\"center center\" class=\"solo-box\">\n" +
    "	<md-card class=\"big-form\">\n" +
    "		<div>\n" +
    "			<md-toolbar>\n" +
    "			    <div class=\"md-toolbar-tools\" layout-align=\"center center\">\n" +
    "			    	<span class=\"md-flex\">Solicitar Servicio</span>\n" +
    "			    </div>\n" +
    "			</md-toolbar>\n" +
    "		</div>\n" +
    "	    <div>\n" +
    "			<form name=\"requestMessengerForm\" novalidate>\n" +
    "				<md-card>\n" +
    "					<md-input-container flex>\n" +
    "						<label>Nombre de Servicio</label>\n" +
    "		            	<input name=\"item_name\" ng-model=\"model.delivery.item_name\" required>\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Dirección de Recogida</label>\n" +
    "		            	<input name=\"pickup_address\" ng-model=\"pickup_address\" required ng-click=\"model.pickUpMap()\">\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-content ng-if=\"pickup_address\" class=\"md-padding\" style=\"height: 360px;padding: 14px;\">\n" +
    "						<pickup-map class=\"map-container\" lat=\"position.lat\" lon=\"position.lng\"></pickup-map>\n" +
    "		        	</md-content>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Dirección de Entrega</label>\n" +
    "		            	<input name=\"delivery_address\" ng-model=\"delivery_address\" required>\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-content ng-if=\"pickup_address\" class=\"md-padding\" style=\"height: 360px;padding: 14px;\">\n" +
    "						<delivery-map class=\"map-container\" callback=\"setLatLong(lat, lon)\"></delivery-map>\n" +
    "		        	</md-content>\n" +
    "		        	<md-switch aria-label=\"Ida y Vuelta\" ng-model=\"model.delivery.roundtrip\">\n" +
    "					    Ida y Vuelta\n" +
    "					</md-switch>\n" +
    "					<md-button class=\"md-raised v-margin-btn\" ng-click=\"showAddresses($event)\">Historial de direcciones</md-button>\n" +
    "				</md-card>\n" +
    "				<md-card class=\"top-fix\">\n" +
    "					<md-input-container flex>\n" +
    "						<label>Dia y hora de Recogida</label>\n" +
    "						<!-- <input type=\"date\" name=\"pickup_time\" ng-model=\"pickup_time\" required> -->\n" +
    "		        	</md-input-container>\n" +
    "		        	<time-date-picker ng-model=\"model.delivery.pickup_time\" required></time-date-picker>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Dia y hora de Entrega</label>\n" +
    "						<!-- <input type=\"date\" name=\"deadline\" ng-model=\"deadline\" required> -->\n" +
    "		        	</md-input-container>\n" +
    "		        	<time-date-picker ng-model=\"model.delivery.deadline\" required></time-date-picker>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Valor declarado de la mercancia</label>\n" +
    "		            	<input name=\"declared_value\" ng-model=\"model.delivery.declared_value\" placeholder=\"min. $1.000\" required>\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Instrucciones para mensajero</label>\n" +
    "		            	<textarea name=\"instructions\" ng-model=\"model.delivery.instructions\" required></textarea>\n" +
    "		        	</md-input-container>\n" +
    "				</md-card>\n" +
    "				<md-toolbar ng-show=\"pickup_address && delivery_address\" class=\"md-primary\" layout-align=\"center center\">\n" +
    "				    <span layout-align=\"center center\">\n" +
    "				    	Valor del servicio\n" +
    "				    </span>\n" +
    "				    <span layout-align=\"center center\">\n" +
    "				    	COP {{deliveryPrice}}\n" +
    "				    </span>\n" +
    "				</md-toolbar>\n" +
    "	        	<md-input-container flex>\n" +
    "	        		<md-button class=\"md-raised primary-btn\" ng-click=\"model.requestMessenger()\">Solicitar</md-button>\n" +
    "	        	</md-input-container>\n" +
    "			</form>\n" +
    "	    </div>\n" +
    "	    <md-divider></md-divider>\n" +
    "	</md-card>\n" +
    "</div>\n" +
    "");
}]);
