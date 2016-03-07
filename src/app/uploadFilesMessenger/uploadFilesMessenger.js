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
                model.step = 1;

                model.filesUploaded = {};

                model.nextStep = function(){
                    if(model.step < 6){
                        model.step++;
                    }
                };

                model.backStep = function(){
                    if(model.step > 1){
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

                model.finishProcess = function() {
                    $state.go('createMessenger');
                };

                $( document ).ready(function() {
                    $("#licenseFile").on('change', function () {
                        console.log('licenseFile UPLOADING.....');
                        if (typeof (FileReader) != "undefined") {
                 
                            var image_holder = $("#licensePicture");
                            image_holder.empty();
                 
                            var licenseReader = new FileReader();
                            licenseReader.onload = function (e) {
                                $("<img />", {
                                    "src": e.target.result,
                                    "class": "thumb-image"
                                }).appendTo(image_holder);
                 
                            };
                            image_holder.show();
                            licenseReader.readAsDataURL($(this)[0].files[0]);
                        } else {
                            alert("This browser does not support FileReader.");
                        }
                    });
                    $("#identificationFile").on('change', function () {
                        console.log('identificationFile UPLOADING.....');
                        if (typeof (FileReader) != "undefined") {
                 
                            var image_holder = $("#identificationPicture");
                            image_holder.empty();
                 
                            var identificationReader = new FileReader();
                            identificationReader.onload = function (e) {
                                $("<img />", {
                                    "src": e.target.result,
                                    "class": "thumb-image"
                                }).appendTo(image_holder);
                 
                            };
                            image_holder.show();
                            identificationReader.readAsDataURL($(this)[0].files[0]);
                        } else {
                            alert("This browser does not support FileReader.");
                        }
                    });
                });
                
                var uploadFile = function(file,type,index){
                    model.uploadingFile = true;
                    if(file){
                        UploadFilesMessengerService.uploadFile(
                            model.messenger_id,type,file,function(response){
                                console.log(response);
                                if(response.data){
                                    model.uploadingFile = false;
                                    model.filesUploaded[index] = response.data.url;
                                    model.nextStep();
                                }else{
                                    if(response.msg.path == "_id"){
                                        $state.go("loginUser");
                                        $scope.BootstrapModal.show("El identificador no corresponde a un usuario válido");
                                    }else{
                                        $scope.BootstrapModal.show("No se logró subir el archivo por favor vuelva a intentarlo");
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