angular.module('templates-app', ['about/about.tpl.html', 'createUser/createUser.tpl.html', 'home/home.tpl.html', 'loginUser/loginUser.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<h1>About</h1>\n" +
    "\n" +
    "<p>This is what this is about.</p>");
}]);

angular.module("createUser/createUser.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("createUser/createUser.tpl.html",
    "<h1>CreateUser</h1>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<h1>Home of App mensajeria</h1>\n" +
    "\n" +
    "<p>Code it up</p>\n" +
    "\n" +
    "<p>\n" +
    "    <span ng-bind=\"model.someVar\" />\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"item in model.someList\">{{item}}</li>\n" +
    "    </ul>\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"model.someFunctionUsedByTheHomePage()\">Click Me</button>\n" +
    "</p>");
}]);

angular.module("loginUser/loginUser.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("loginUser/loginUser.tpl.html",
    "<h1>LoginUser</h1>");
}]);
