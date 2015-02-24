angular.module('templates-common', ['userMap/userMap.tpl.html']);

angular.module("userMap/userMap.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("userMap/userMap.tpl.html",
    "<div id=\"map\" class=\"map\"></div>");
}]);
