angular.module('templates-common', ['session/session.tpl.html', 'userMap/deliveryMap.tpl.html', 'userMap/pickupMap.tpl.html']);

angular.module("session/session.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("session/session.tpl.html",
    "<h1>Session</h1>");
}]);

angular.module("userMap/deliveryMap.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("userMap/deliveryMap.tpl.html",
    "<div id=\"delmap\" class=\"map\"></div>");
}]);

angular.module("userMap/pickupMap.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("userMap/pickupMap.tpl.html",
    "<div id=\"map\" class=\"map\"></div>");
}]);
