(function(module) {
    module.service('ValidationService', ['$state', function($state) {
        var model = this;

        init();

        function init() {
        }

        model.isValidAddPaymentRequest=function(addPaymentRequest){
            var res={ message:'Verifica los siguientes campos <BR/>',isValid:true};
            if (!addPaymentRequest.card_number || addPaymentRequest.card_number.length<14){
                res.message+="- Numero de Tarjeta <BR/>";
                res.isValid=false;
            }
            if (!addPaymentRequest.exp_date || addPaymentRequest.exp_date.length!=5){
                res.message+="- Fecha Vencimiento <BR/>";
                res.isValid=false;
            }
            if (!addPaymentRequest.cvv || addPaymentRequest.cvv.lenght<3){
                res.message+="- CVV <BR/>";
                res.isValid=false;
            }

            return res;
        };

    }]);

}(angular.module("appMensajeria.ValidationService",[])));
