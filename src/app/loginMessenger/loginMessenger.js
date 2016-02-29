(function (module) {

    module.controller('LoginMessengerController', ['LoginMessengerService', '$state', '$mdDialog', 'User', 'Session', 'RecoverPassword', 'AlertsService', "$scope",
        function (LoginMessengerService, $state, $mdDialog, User, Session, RecoverPassword, AlertsService, $scope) {
            var model = this;
            //model.rememberMe = false;
            model.MY_FORM = "";

            init();

            function init() {

                $scope.$watch('loginForm', function (newValue) {
                    if (newValue) {
                        model.MY_FORM = $scope.loginForm;
                        model.autoLogin();
                    }
                });

                model.recoverAlert = function () {
                    $scope.BootstrapModal.show("Te hemos enviado un correo electrónico para que puedas recuperar tu contraseña.");
                    /*$mdDialog.show(
                     $mdDialog.alert()
                     .content('Te hemos enviado un correo electrónico para que puedas recuperar tu contraseña.')
                     .ariaLabel('recover password')
                     .ok('Aceptar')
                     .disableParentScroll(false)
                     );*/
                };

                model.loginMessenger = function () {
                    if (model.MY_FORM.$valid) {
                        //AlertsService.loading();
                        LoginMessengerService.loginMessenger(model.messenger.email, model.messenger.password, function (response) {
                            //console.log(response);
                            var user = response.data;
                            //AlertsService.cancel();

                            if ( !response.response ) {
                                $scope.BootstrapModal.show(response.msg,"Error al iniciar sesión");
                                $state.go("uploadFilesMessenger",{ id: response.data.messenger_id  });
                            } else if ( response.data && response.response ) {
                                /*
                                //INFO PARA EL HEADER
                                var headerInfo = {"email": model.user.email, "password": btoa(model.user.password)};
                                sessionStorage.setItem("id", user._id);
                                sessionStorage.setItem('email', headerInfo.email);
                                sessionStorage.setItem('pass', headerInfo.password);
                                sessionStorage.setItem("token", response.data.session.token);


                                if (model.rememberMe === true) {
                                    localStorage.setItem('isLoginMessenger', true);
                                    ///////
                                    var userInfoLogin = {};
                                    userInfoLogin.email = model.messenger.email;
                                    userInfoLogin.password = btoa(model.messenger.password);
                                    localStorage.setItem('MessengerInfoLogin', JSON.stringify(userInfoLogin));
                                    ///////
                                }

                                User = user;
                                //console.log(User);
                                Session.setUser(User);
                                $state.go('requestMessenger');
                                */
                                Session.setMessenger();
                                $state.go('download');
                            } else{
                                $scope.BootstrapModal.show("Usuario o contraseña incorrectos");
                            }


                        });
                    } else {
                        //AlertsService.showSimpleAlert("Completa los campos de email y contraseña");
                        $scope.BootstrapModal.show("Completa los campos de email y contraseña");
                    }

                };

                model.newAccount = function () {
                    console.log("IR A NUEVA CUENTA");
                    $state.go('createUser');
                };

                model.recoverPassword = function () {
                    //IR A LA VENTANA DE RECUPERAR CONTRASEÑA
                    console.log("RECUPERAR CONTRASEÑA");
                    $state.go('recoverPassword');
                };


                model.autoLogin = function () {

                    if (localStorage.getItem('isLogin')) {
                        console.log("EXISTE");
                        var user = {};
                        user = JSON.parse(localStorage.getItem("MessengerInfoLogin"));
                        model.messenger = {};
                        model.messenger.email = user.email;
                        model.messenger.password = atob(user.password);

                        console.log('form ', loginForm);
                        model.loginUser();
                    }
                };

            }
        }]);

}(angular.module("appMensajeria.loginMessenger")));