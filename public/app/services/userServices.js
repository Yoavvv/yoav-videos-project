(function(){
    
    "use strict";

    angular.module("userServices", [])
    
    .factory("User", function($http) {
        var userFactory = {};
        userFactory.create = function(regData) {
            return $http.post("/users/", regData);
        };
        
        return userFactory;
    });
    
})();