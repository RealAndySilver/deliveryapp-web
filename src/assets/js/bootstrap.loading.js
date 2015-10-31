(function (module) {
    module.directive("bsLoading", [ '$sce', '$timeout', '$templateCache', function ( $sce, $timeout, $templateCache ) {
        var link = function(scope, element, attrs, tabsCtrl){
            var type = {
                    success: "progress-bar-success",
                    info: "progress-bar-info",
                    warning: "progress-bar-warning",
                    danger: "progress-bar-danger"
                };

            var toBoolean = function(strBool){
                return strBool==="true"?true:(strBool==="false"?false:false);
            }

            scope.BootstrapLoading = {
                config: {
                    label: attrs.label,
                    percentage: attrs.percent?attrs.percent:"",
                    type: type[attrs.type] ? type[attrs.type] : "progress-bar-success",
                    show: toBoolean(attrs.show),
                    active: toBoolean(attrs.active)?"active":""
                },
                show: function(isShow){
                    this.config.show = isShow;
                    console.log("muestre", isShow);
                }
            };

        };
        return {
            restrict: 'E',
            link: link,
            templateUrl: "bootstrap-loading.html"
        };

    }]).run([ '$templateCache', function( $templateCache) {
        var template = '<div class="progress">'+
                       '  <div class="progress-bar {{BootstrapLoading.config.type}} progress-bar-striped {{BootstrapLoading.config.active}}" role="progressbar" aria-valuenow="{{BootstrapLoading.config.percentage}}" aria-valuemin="0" aria-valuemax="100" ng-show="BootstrapLoading.config.show" style="width:{{BootstrapLoading.config.percentage}}%">'+
                       '    {{BootstrapLoading.config.label}}'+
                       '  </div>'+
                       '</div>';
        $templateCache.put( 'bootstrap-loading.html' , template );
    }]);
})(angular.module("bootstrap-loading", ["ng"]));

