(function(module) {

	module.service('GetAllAddressService', ['PickupAddresses', 'DeliveryAddresses', function(PickupAddresses, DeliveryAddresses) {
		var model = this;

		var MAX_ADDRESS = 3;


		model.save = function(pickupItem, deliveryItem) {

			if (PickupAddresses.length === 0) {
				PickupAddresses = JSON.parse(localStorage.getItem('PickupAddresses'));
				DeliveryAddresses = JSON.parse(localStorage.getItem('DeliveryAddresses'));

				if (PickupAddresses === null) {
					PickupAddresses = [];
					DeliveryAddresses = [];
				}
			}

			PickupAddresses.splice(0, 0, pickupItem);
			DeliveryAddresses.splice(0, 0, deliveryItem);

			if (PickupAddresses.length > MAX_ADDRESS) {
				PickupAddresses.pop();
				DeliveryAddresses.pop();
			}

			localStorage.setItem('PickupAddresses', JSON.stringify(PickupAddresses));
			localStorage.setItem('DeliveryAddresses', JSON.stringify(DeliveryAddresses));
		};


	}]);

	module.controller('RequestMessengerController', ['$rootScope','$scope', '$mdDialog', 'RequestMessengerService', 'Session', 'GetPrice', '$stateParams', '$state', 'PickupAddresses', 'DeliveryAddresses', 'GetAllAddressService', "AlertsService", 'BillingService', 'ServerComunicator','ValidationService', function($rootScope,$scope, $mdDialog, RequestMessengerService, Session, GetPrice, $stateParams, $state, PickupAddresses, DeliveryAddresses, GetAllAddressService, AlertsService, BillingService, ServerComunicator,ValidationService) {
		var model = this;

		//Funcion llamada por la directiva de adicionar tarjeta y se usa para refrescar lo necesario en este controlador
		//despues de que se adiciono una tarjeta
		$rootScope.creditCardAdded=function(){
			model.getCurrentUser();
		};
		//var clientIP = null;
		model.serviceEndpoint = ServerComunicator.getEndpoint;

		model.pickUpAddressSave = JSON.parse(localStorage.getItem('PickupAddresses'));
		model.deliveryAddressSave = JSON.parse(localStorage.getItem('DeliveryAddresses'));

		//Used for timer the google reverse geocode search
		model.processId=0;

		$(function() {
			$.getJSON("https://api.ipify.org?format=jsonp&callback=?",
				function(json) {
					model.delivery.ip_address = json.ip || null;
					//alert("My public IP address is: ", clientIP);
				}
			);
		});

		init();

		model.pickup = {};
		model.delivery = {insurancevalue:0,insurance:false};
		model.messengers = {};

		model.searchAddressField = "";
		model.addressListFromGoogle = [];

		model.roundtrip = false;
		$scope.modal = {};

		model.currentBillingInformation = [];
		model.defaultPaymentMethod = {};
		model.showBillingModal = false;
		model.currentFranchise = "";
		model.insuranceSelected=0;
		var addPaymentRequest = {};

		function init() {
		}




		$scope.showAlert = function() {
			$scope.BootstrapModal.show("Recuerda activar el permiso para utilizar tu ubicación en la barra superior.");
		};
		//$scope.showAlert();


		/**
		 * Reclacula el valor a pagar del seguro
		 *
		 * */
		model.insuranceSelectionChanged=function(){
			if(!model.delivery.insurance){
				model.insuranceSelected=0;
			}
			model.delivery.insurancevalue=model.insuranceSelected*0.02;
		};

		/**
		 * This method makes a search using reverse geocode on google api services
		 *
		 * */
		model.searchGoogleAddresses = function(address){
			//console.log(address);
			clearTimeout(model.processId);
			model.processId = setTimeout(function() {
				//console.log("Buscando");

				var geocoder = new google.maps.Geocoder();

				var googleRequest = {
					address: address,
					componentRestrictions: {
							country: 'CO',
							locality: 'Bogotá'
					}
				};

				geocoder.geocode(googleRequest, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						$scope.$apply(function(){
							//console.log("maps", results);
							model.addressListFromGoogle = results;
						});
					} else {
						console.log('MAPS Geocode was not successful for the following reason: ', status);
					}
				});
			},1000);
		};


		/**
		 * This methods refreshes the map when the user selects an address from the window,
		 * this makes integrations with the directive that displays the map
		 *
		 * */
		model.updateAddressInMap=function(updatePickup,googleAddress){
			if (updatePickup){
				$rootScope.updatePickupMap({lat:googleAddress.geometry.location.lat(),lng:googleAddress.geometry.location.lng()});
			}else{
				$rootScope.updateDeliveryMap({lat:googleAddress.geometry.location.lat(),lng:googleAddress.geometry.location.lng()});
			}
			$('#searchAddress').modal('hide');
		};

		model.getPaymentMethods = function(userInfo) {
			//console.log('CURRENT USER DATA ', userInfo);

			BillingService.getPaymentMethods(userInfo._id, function(response) {
				console.log('getPaymentMethods ->', response);

				if (response.data) {
					model.currentBillingInformation = response.data;
					if (model.currentBillingInformation[0]){
						model.showBillingModal = false;
						model.defaultPaymentMethod = model.currentBillingInformation[0]._id;
						console.log('defaultPaymentMethod --> ', model.defaultPaymentMethod);
					}
				} else {
					//$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
					//$state.go('requestMessenger');
				}

			});
		};

		model.getCurrentUser = function() {
			$scope.currentUser = Session.getUser();

			if ($scope.currentUser) {
				model.getPaymentMethods($scope.currentUser);
			}
		};

		model.getCurrentUser();

		$scope.pickupLat = 0;
		$scope.pickupLon = 0;

		$scope.deliverLat = 0;
		$scope.deliverLon = 0;

		$scope.delivery_address = '';

		function assignToPickupAddress(value) {
			$scope.pickup_address = value;
		}

		function assignToDeliveryAddress(value) {
			$scope.delivery_address = value;
		}

		function closeToMe(lat, lon){
			RequestMessengerService.closeToMe(lat,lon, function(response) {
				model.messengers.locations = [];
				response.data.locations.forEach(function(location){
					model.messengers.locations.push({lat:parseFloat(location.lat),lng:parseFloat(location.lon)});
				});
			});
		}

		function geocodeDelivery() {
			var geocoder = new google.maps.Geocoder();
			var latlng = "";
			var fieldToPutData;
			if ($scope.valueBool) {
				latlng = new google.maps.LatLng($scope.pickupLat, $scope.pickupLon);
				fieldToPutData = assignToPickupAddress;
			} else {
				latlng = new google.maps.LatLng($scope.deliverLat, $scope.deliverLon);
				fieldToPutData = assignToDeliveryAddress;
			}

			geocoder.geocode({
				'latLng': latlng
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var res = results[0].formatted_address.split(" a ", 1);
						fieldToPutData(res[0]);
						//$scope.delivery_address = res[0];
					} else {
						fieldToPutData('Location not found');
						//$scope.delivery_address = 'Location not found';
					}
				} else {
					fieldToPutData('Geocoder failed due to: ' + status);
					//$scope.delivery_address = 'Geocoder failed due to: ' + status;
				}
			});
		}

		$scope.setLatLong = function(lat1, lon1, lat2, lon2, valueBool) {
			//console.log("LAT 1",lat1,"LON 1",lon1);
			$scope.$apply(function() {
				$scope.pickupLat  = parseFloat(lat1);
				$scope.pickupLon  = parseFloat(lon1);
				$scope.deliverLat = parseFloat(lat2);
				$scope.deliverLon = parseFloat(lon2);
				$scope.valueBool  = valueBool;
				closeToMe($scope.pickupLat, $scope.pickupLon);
				geocodeDelivery();
			});
			getDistance($scope.pickupLat, $scope.pickupLon, $scope.deliverLat, $scope.deliverLon);
		};

		function getDistance(pickupLat, pickupLon, destinationLat, destinationLon) {
			var loc1 = '';
			var loc2 = '';
			if (destinationLat !== 0) {
				loc1 = pickupLat + "," + pickupLon;
				loc2 = destinationLat + "," + destinationLon;
				GetPrice.getPrice(loc1, loc2, function(response) {
					if (response.response) {
						$scope.currency = true;
						$scope.deliveryPrice = response.data;
					}
				});
			} else {
				console.log('no estan todos los parámetros requeridos');
			}
		}


		model.requireAddCreditCard = function(){
			if (model.delivery.payment_method === 'credit' && model.currentBillingInformation.length === 0) {
				return true;
			} else {
				return false;
			}
		};

		var pickupItem = {};
		var deliveryItem = {};
		model.requestMessenger = function() {

			if (model.requireAddCreditCard()){
				$('#addBilling').modal('show');
				return;
			}

			if ($scope.requestMessengerForm.$valid) {

				model.delivery.pickup_object = {};
				model.delivery.pickup_object.address = $scope.pickup_address;
				model.delivery.pickup_object.lat = $scope.pickupLat;
				model.delivery.pickup_object.lon = $scope.pickupLon;

				model.delivery.delivery_object = {};
				model.delivery.delivery_object.address = $scope.delivery_address;
				model.delivery.delivery_object.lat = $scope.deliverLat;
				model.delivery.delivery_object.lon = $scope.deliverLon;

				model.delivery.roundtrip = model.roundtrip;

				model.delivery.price_to_pay = $scope.deliveryPrice+model.delivery.insurancevalue;
				model.delivery.user_info = $scope.currentUser;
				model.delivery.user_id = $scope.currentUser._id;

				model.delivery.service_price = $scope.deliveryPrice;

				//console.log("PAYMENT ",model.defaultPaymentMethod);

				model.delivery.token_id = model.defaultPaymentMethod;
				//model.delivery.ip_address = clientIP;

				//AlertsService.loading(true);
				$scope.BootstrapLoading.show(true);
				console.log("delivery OBJECT REQUEST ", model.delivery);
				RequestMessengerService.requestMessenger(model.delivery, function(response) {
					//console.log(response);
					//AlertsService.loading(false);
					console.log(response);
					$scope.BootstrapLoading.show(false);

					if (response.response) {
						var pickupItem = response.data.pickup_object;
						var deliveryItem = response.data.delivery_object;
						if (response.msg === "a1" || response.msg === "a2" || response.msg === "a3") {
							LogOut.logOutFunction();
						} else {
							GetAllAddressService.save(pickupItem, deliveryItem);

							$state.go('serviceDetails', {
								id: response.data._id
							});
						}
					} else {
						$scope.BootstrapModal.show(response.msg);
					}
				});
			} else {
				$scope.BootstrapModal.show("Completa todos los campos por favor");
				//AlertsService.showSimpleAlert("Completa todos los campos por favor");
			}
		};


		model.showAddressBool = false;
		model.showOptionsEnsurances = false;

		model.isShowing = function(tap) {
			if (model[tap]) {
				model[tap] = false;
			} else {
				model[tap] = true;
			}
		};

		function DialogController($scope, $mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
			$scope.answer = function(answer) {
				$mdDialog.hide(answer);
			};
		}

		model.enableSearchAddress=function(searchAddress){
			$('#searchAddress').modal('show');
			model.searchAddressField=searchAddress;
			model.addressListFromGoogle=[];

		};

		$scope.useAddress = function(answer, delivery) {
			console.log('clo se to me');
			if (answer === "pickup") {
				$scope.pickupLat = delivery["lat"];
				$scope.pickupLon = delivery["lon"];

				model.pickup = {
					lat: delivery['lat'],
					lng: delivery['lon']
				};
				$scope.valueBool = true;
				geocodeDelivery();
			} else if (answer === "delivery") {

				$scope.deliverLat = delivery["lat"];
				$scope.deliverLon = delivery["lon"];

				model.delivery = {
					lat: delivery['lat'],
					lng: delivery['lon']
				};
				$scope.valueBool = false;
				geocodeDelivery();
			}

		};
	}]);

}(angular.module("appMensajeria.requestMessenger")));