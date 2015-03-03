angular.module('templates-common', ['session/session.tpl.html', 'userMap/userMap.tpl.html']);

angular.module("session/session.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("session/session.tpl.html",
    "<h1>Session</h1>");
}]);

angular.module("userMap/userMap.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("userMap/userMap.tpl.html",
    "<div id=\"map\" class=\"map\"></div>");
}]);
