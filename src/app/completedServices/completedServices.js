(function(module) {

	module.controller('CompletedServicesController', ["Session", 'CompletedServicesService', '$state', 'AlertsService',"LogOut", "$scope", function(Session, CompletedServicesService, $state, AlertsService,LogOut, $scope) {
		var model = this;
		model.deliveryItems=[];
		model.User = (Session.getUser());
		model.pagingInfo={currentPage:1,pageSize:10,totalRecords:0};

		var updatePagingInfo=function(currPage,totRecords){
			model.pagingInfo.currentPage=currPage;
			model.pagingInfo.totalRecords=totRecords;
		};

		model.getCompletedServices = function(pageNumber) {
			var recordsToSkip=(pageNumber-1);
			CompletedServicesService.getCompletedServices(model.User["_id"],recordsToSkip, function(response) {
				console.log("RESPONSE ",response);
				model.deliveryItems=response.data;
				updatePagingInfo(pageNumber,response.total);
			});
		};


		model.goToServiceDetails = function(idObject) {
			$state.go('serviceDetails', {
				id: idObject
			});
		};

		function init() {
			model.getCompletedServices(1);
		}

		init();
	}]);

}(angular.module("appMensajeria.completedServices")));