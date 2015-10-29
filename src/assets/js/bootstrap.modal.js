(function (module) {
    module.directive("bsModal", [ '$sce', '$timeout', '$templateCache', function ( $sce, $timeout, $templateCache ) {


        var link = function(scope, element, attrs, tabsCtrl){
            var modalElement = $("#BSModalDirective");
            var modalSize = {
                  sm: "modal-sm",
                  lg: "modal-lg"
                };

            scope.BootstrapModal = {
                config: {
                    title: attrs.title,
                    content: attrs.content,
                    modalSize: modalSize[attrs.size]?modalSize[attrs.size]:"",
                    buttons: {
                      cancel: {
                          show: attrs.showCancelButton==="true"?true:false,
                          label: attrs.labelCancelButton?attrs.labelCancelButton:"Cancel",
                          action: function(){
                              modalElement.modal("hide");
                          }
                      },
                      accept: {
                          show: true,
                          label: attrs.labelAcceptButton?attrs.labelAcceptButton:"Accept",
                          action: function(){
                              modalElement.modal("hide");
                          }
                      },
                      close: {
                          show: attrs.showCloseButton==="true"?true:false
                      }
                    }
                },
                show: function(content, title){
                    if(title){
                        this.config.title = title;
                    }
                    this.config.content = content;
                    modalElement.modal("show");
                    //this.content = $sce.trustAsHtml(data.content);
                },
                showTitle: function(){
                    return this.config.title!==false;
                },
                setConfiguration: function(data){
                    this.config = data;
                }
            };

        };
        return {
            restrict: 'E',
            link: link,
            templateUrl: "bootstrap-modal.html"
        };

    }]).run([ '$templateCache', function( $templateCache) { 
        var template = '<div class="modal fade" role="dialog" id="BSModalDirective" aria-labelledby="BSModalDirective">'+
                       '    <div class="modal-dialog {{BootstrapModal.config.modalSize}}">'+
                       '        <div class="modal-content">'+
                       '            <div class="modal-header" ng-show="BootstrapModal.showTitle()">'+
                       '                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-show="BootstrapModal.config.buttons.close.show"><span aria-hidden="true">&times;</span></button>'+
                       '                <h4 class="modal-title">{{BootstrapModal.config.title}}</h4>'+
                       '            </div>'+
                       '            <div class="modal-body">{{BootstrapModal.config.content}}</div>'+
                       '            <div class="modal-footer">'+
                       '                <button type="button" class="btn btn-default" ng-show="BootstrapModal.config.buttons.cancel.show" ng-click="BootstrapModal.config.buttons.cancel.action()">{{BootstrapModal.config.buttons.cancel.label}}</button>'+
                       '                <button type="button" class="btn btn-success" ng-show="BootstrapModal.config.buttons.accept.show" ng-click="BootstrapModal.config.buttons.accept.action()">{{BootstrapModal.config.buttons.accept.label}}</button>'+
                       '            </div>'+
                       '        </div>'+
                       '    </div>'+
                       '</div>';
        $templateCache.put( 'bootstrap-modal.html' , template );
    }]);
})(angular.module("bootstrap-modal", ["ng"]));

