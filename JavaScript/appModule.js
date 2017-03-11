(function(){
    
    "use strict";
    
    var appModule = angular.module("appModule", ["ngRoute", "mainModule", "registerModule"]);
    
    appModule.config(function($routeProvider) {
        
        $routeProvider.when("/main", {
            controller: "MainController",
            templateUrl: "/HTML/mainView.html"
       });
        
        $routeProvider.when("/register", {
            controller: "RegisterController",
            templateUrl: "/HTML/registerView.html"
       });
        $routeProvider.otherwise({
           redirectTo: "/main" 
        });
        console.log("appModule is running!!!");
    });
})();