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
    "	        		<md-button class=\"md-raised md-warn\">Cancelar</md-button>\n" +
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
    "	    <md-button class=\"md-raised v-margin-btn\" href=\"#\">Crear nueva cuenta</md-button>\n" +
    "	</md-card>\n" +
    "</div>\n" +
    "");
}]);

angular.module("requestMessenger/requestMessenger.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("requestMessenger/requestMessenger.tpl.html",
    "<div layout=\"column\" layout-align=\"center center\" class=\"solo-box\">\n" +
    "	<md-card class=\"basic-form\">\n" +
    "		<div>\n" +
    "			<md-toolbar>\n" +
    "			    <div class=\"md-toolbar-tools\" layout-align=\"center center\">\n" +
    "			    	<span class=\"md-flex\">Solicitar Servicio</span>\n" +
    "			    </div>\n" +
    "			  </md-toolbar>\n" +
    "		</div>\n" +
    "	    <div>\n" +
    "			<form name=\"requestMessengerForm\" ng-submit=\"model.requestMessenger()\" novalidate>\n" +
    "				<md-card>\n" +
    "					<md-input-container flex>\n" +
    "						<label>Nombre de Servicio</label>\n" +
    "		            	<input name=\"email\" ng-model=\"model.user.item_name\" required>\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-input-container flex id=\"geo-cositas\">\n" +
    "						<label>Dirección de Recogida</label>\n" +
    "		            	<input name=\"email\" ng-model=\"model.user.pickup_object\" required ng-click=\"model.getLocation()\">\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-content ng-if=\"model.user.pickup_object\" class=\"md-padding\" style=\"height: 360px;padding: 14px;\">\n" +
    "						<user-map class=\"map-container\">\n" +
    "							<div class=\"map\" id=\"map\" ng-cloak></div>\n" +
    "						</user-map>\n" +
    "		        	</md-content>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Dirección de Entrega</label>\n" +
    "		            	<input name=\"email\" ng-model=\"model.user.delivery_object\" required>\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-switch aria-label=\"Ida y Vuelta\" ng-model=\"model.user.roundtrip\">\n" +
    "					    Ida y Vuelta\n" +
    "					</md-switch>\n" +
    "					<md-button class=\"md-raised v-margin-btn\" href=\"#\">Historial de direcciones</md-button>\n" +
    "				</md-card>\n" +
    "				<md-card>\n" +
    "					<md-input-container flex>\n" +
    "						<label>Dia y hora de Recogida</label>\n" +
    "		            	<input name=\"email\" type=\"date\" ng-model=\"model.user.pickup_time\" required>\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Dia y hora de Entrega</label>\n" +
    "		            	<input name=\"email\" type=\"date\" ng-model=\"model.user.deadline\" required>\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Valor declarado de la mercancia</label>\n" +
    "		            	<input name=\"email\" ng-model=\"model.user.declared_value\" placeholder=\"min. $1.000\" required>\n" +
    "		        	</md-input-container>\n" +
    "		        	<md-input-container flex>\n" +
    "						<label>Instrucciones para mensajero</label>\n" +
    "		            	<textarea name=\"email\" ng-model=\"model.user.instructions\" required></textarea>\n" +
    "		        	</md-input-container>\n" +
    "				</md-card>\n" +
    "				<md-toolbar class=\"md-primary\" layout-align=\"center center\">\n" +
    "				    <span layout-align=\"center center\">\n" +
    "				    	Valor del servicio\n" +
    "				    </span>\n" +
    "				    <span layout-align=\"center center\">\n" +
    "				    	COP $1.000\n" +
    "				    </span>\n" +
    "				</md-toolbar>\n" +
    "	        	<md-input-container flex>\n" +
    "	        		<md-button class=\"md-raised primary-btn\">Solicitar</md-button>\n" +
    "	        	</md-input-container>\n" +
    "			</form>\n" +
    "	    </div>\n" +
    "	    <md-divider></md-divider>\n" +
    "	</md-card>\n" +
    "</div>\n" +
    "");
}]);
