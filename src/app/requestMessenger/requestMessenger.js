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

	module.controller('RequestMessengerController', ['$scope', '$mdDialog', 'RequestMessengerService', 'Session', 'GetPrice', '$stateParams', '$state', 'PickupAddresses', 'DeliveryAddresses', 'GetAllAddressService', "AlertsService", 'BillingService', function($scope, $mdDialog, RequestMessengerService, Session, GetPrice, $stateParams, $state, PickupAddresses, DeliveryAddresses, GetAllAddressService, AlertsService, BillingService) {
		var model = this;

		model.pickUpAddressSave = JSON.parse(localStorage.getItem('PickupAddresses'));
		model.deliveryAddressSave = JSON.parse(localStorage.getItem('DeliveryAddresses'));

		init();

		model.pickup = {};
		model.delivery = {};
		model.messengers = {};

		model.currentBillingInformation = [];
		model.defaultPaymentMethod = {};
		model.showBillingModal = false;
		model.currentFranchise = "";
		var addPaymentRequest = {};

		function init() {

			model.roundtrip = false;
			$scope.modal = {};

			$scope.showAlert = function() {
				$scope.BootstrapModal.show("Recuerda activar el permiso para utilizar tu ubicación en la barra superior.");
			};
			//$scope.showAlert();

			$scope.modal.getPositionBy = function(address){
				console.log(address);
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode( { 'address': address + ", Bogotá", country: "CO"/*bounds: "4.50541610527197,-74.206731878221|4.80140167730285,-74.0019284561276"*/}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						console.log("maps", results[0]);
						//Se llama al close to me

						/*map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: map,
							position: results[0].geometry.location
						});*/
					} else {
						console.log('MAPS Geocode was not successful for the following reason: ', status);
					}
				});
				/*if(address){
					$scope.modal.address = address;
					$scope.BootstrapModal.show();
				}else{
					$scope.BootstrapModal.show();
				}*/
			};

			model.getPaymentMethods = function(userInfo) {
				console.log('CURRENT USER DATA ', userInfo);

				BillingService.getPaymentMethods(userInfo._id, function(response) {
					console.log('getPaymentMethods ->', response);

					if (response.response) {
						model.currentBillingInformation = response.data;
						model.defaultPaymentMethod = model.currentBillingInformation[0];
						console.log('defaultPaymentMethod --> ', model.defaultPaymentMethod);
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
						/*else {
							$scope.currency = false;
							$scope.deliveryPrice = response.msg;
						}*/
					});
				} else {
					console.log('no estan todos los parámetros requeridos');
				}
			}

			var pickupItem = {};
			var deliveryItem = {};
			model.requestMessenger = function() {
				if (model.delivery.payment_method === 'credit' && model.currentBillingInformation.length === 0) {
					//console.log('AGREGAR TARJETA');
					model.showBillingModal = true;
				} else {
					//console.log('PAGAR CON TARJETA POR DEFECTO');
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

					model.delivery.price_to_pay = $scope.deliveryPrice;
					model.delivery.user_info = $scope.currentUser;
					model.delivery.user_id = $scope.currentUser._id;

					//AlertsService.loading(true);
					$scope.BootstrapLoading.show(true);
					RequestMessengerService.requestMessenger(model.delivery, function(response) {
						//console.log(response);
						//AlertsService.loading(false);
						console.log(response);
						$scope.BootstrapLoading.show(false);
						var pickupItem = response.data.pickup_object;
						var deliveryItem = response.data.delivery_object;

						if (response.response) {

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

			model.addBillingInformation = function(billingInformation) {
				console.log('current billing infotmation ',billingInformation);
				addPaymentRequest.user_id = sessionStorage.id;
				addPaymentRequest.card_number = billingInformation.cardNumber;
				addPaymentRequest.exp_date = billingInformation.expiryMonth + '/' + billingInformation.expiryYear;
				addPaymentRequest.franchise = 'VISA';
				addPaymentRequest.cvv = billingInformation.securityCode;
				console.log('current payment infotmation ',addPaymentRequest);

				BillingService.createPayment(addPaymentRequest, function(response) {
					console.log(response);

					if (response.response) {
						//$state.reload('requestMessenger');
						$('#addBilling').modal('hide'); 
					} else {
						$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
						$state.go('requestMessenger');
					}

				});
			};

			model.getFranchise = function(cardNumber) {
			if (cardNumber.length >3) {
				console.log('get getFranchise.....', cardNumber);

				BillingService.getFranchise(cardNumber, function(response) {
					console.log(response);

					model.currentFranchise = response.data;
					console.log('model.currentFranchise...--> ', model.currentFranchise);

					/*if (response.response) {
						$state.go('requestMessenger'); 
					} else {
						$scope.BootstrapModal.show("Ha ocurrido un error al agregar método de pago, intenta mas tarde");
						$state.go('requestMessenger');
					}*/

				});
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

			
		}

	}]);

}(angular.module("appMensajeria.requestMessenger")));