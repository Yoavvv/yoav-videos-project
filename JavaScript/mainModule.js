(function(){
    
    "use strict";
    
    var mainModule = angular.module("mainModule", []);
    
    mainModule.controller("MainController", function($scope, $http) {
        console.log("mainModule is running!!");
    });
})();