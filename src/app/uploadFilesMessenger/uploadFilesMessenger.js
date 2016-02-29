(function (module) {
    module.controller('UploadFilesMessengerController', ['UploadFilesMessengerService', '$state', 'AlertsService', "$scope","$stateParams",
        function (UploadFilesMessengerService, $state, AlertsService, $scope,$stateParams) {
            var model = this;

            init();

            function init() {
                model.messenger_id = $stateParams.id;
                model.hasLicense = false;
                model.document = false;
                model.soat = false;
                model.propertyCard = false;
                model.photo = false;
                model.step = 0;

                model.filesUploaded = {};

                model.nextStep = function(){
                    if(model.step < 6){
                        model.step++;
                    }
                };

                model.backStep = function(){
                    if(model.step > 0){
                        model.step--;
                    }
                };

                model.selectFileLicense = function(file){
                    uploadFile(file,'licencia','license');
                };

                model.selectFileIdentification = function(file){
                    uploadFile(file,'cedula','identification');
                };

                model.selectFileSoat = function(file){
                    uploadFile(file,'soat','soat');
                };

                model.selectFilePropertyCartdFile = function(file){
                    uploadFile(file,'tarjeta_propiedad','propertyCard');
                };
                model.selectFilePhotoFile = function(file){
                    uploadFile(file,'foto_placa','photo');
                };


                var uploadFile = function(file,type,index){
                    if(file){
                        UploadFilesMessengerService.uploadFile(
                            model.messenger_id,type,file,function(response){
                                //console.log(response);
                                if(response.data){
                                    model.filesUploaded[index] = response.data.url;
                                    model.nextStep();
                                }else{
                                    if(response.msg.path == "_id"){
                                        $state.go("loginUser");
                                        $scope.BootstrapModal.show("El identificador no corresponde a un usuario valido");
                                    }else{
                                        $scope.BootstrapModal.show("No se logro subir el archivo por favor vuelva  a intentarlo");
                                    }
                                }
                            }
                        );
                    }
                };
            }
        }
    ]);

    module.directive('ngFileSelector',function(){
        return {
            restrict : 'A',
            scope : {  file:'=?', onChange :'=' },
            link : function($scope,element,attr){
                element[0].addEventListener('change',function(event){
                    $scope.file = event.target.files[0];
                    $scope.onChange($scope.file);
                });
            }
        };
    });

    module.directive('ngReplicateClick',function(){
        return {
            link : function(scope,element,attr){
                if(element[0]){
                    element[0].addEventListener('click',function(evt){
                        var selector = attr.ngReplicateClick;
                        var node = $(selector)[0];
                        if(node){
                            node.click();
                        }
                    },false);
                }
            }
        };
    });
}(angular.module("appMensajeria.uploadFilesMessenger")));