(function(app) {

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/loginuser');
    });

    app.run(function() {});

    app.controller('AppController', function($scope) {
        $scope.$watch('lat', onChange);
        $scope.$watch('lng', onChange);

        $scope.ome = 'location';

        $scope.lat = 40.730885;
        $scope.lng = -73.997383;

        onChange();

        function onChange() {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                console.log('results', results);
                console.log('status', status);
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $scope.ome = results[0].formatted_address;
                    } else {
                        $scope.ome = 'Location not found';
                    }
                } else {
                    $scope.ome = 'Geocoder failed due to: ' + status;
                }
                console.log('ome', $scope.ome);
            });
        }

    });

}(angular.module("appMensajeria", [
    'appMensajeria.home',
    'appMensajeria.about',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'appMensajeria.loginUser',
    'appMensajeria.createUser',
    'ngMaterial',
    'appMensajeria.serverComunicator',
    'appMensajeria.confirmPassword',
    'appMensajeria.requestMessenger',
    'appMensajeria.userMap',
    'angularReverseGeocode',
])));