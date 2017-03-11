(function(){
    
    "use strict";
    
    var registerModule = angular.module("registerModule", []);
    
    registerModule.controller("RegisterController", function($scope, $http) {
        $scope.register = function() {
            var userName = $scope.userName;
            var password = $scope.password;
            //send to server after validation
            console.log(userName + " ," + password);
        }
    });
})();