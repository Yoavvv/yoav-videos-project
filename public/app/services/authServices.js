(function(){
    
    "use strict";

    angular.module("authServices", [])
    
    
    .factory("Auth", function($http, AuthToken) {
        var authFactory = {};
        authFactory.login = function(loginData) {
            return $http.post("/authenticate", loginData).then(function(data) {
                localStorage.setItem('userName', loginData.userName)
                AuthToken.setToken(data.data.token);
                return data;
            });
        };
        //Auth.isLoggedIn();
        authFactory.isLoggedIn = function() {
          if(AuthToken.getToken()) {
              return true;
          } else {
              return false;
          }
        };
        
        authFactory.getUser = function() {
          if (AuthToken.getToken()) {
              return $http.post("/currentUser");
          } else {
              $q.reject({ message: "User has no token" });
          }
        };
        //Auth.logout();
        authFactory.logout = function() {
            AuthToken.setToken();
        };
        
        return authFactory;
    })
    
    .factory("AuthToken", function($window) {
        var authTokenFactory = {};
            authTokenFactory.setToken = function(token) {
            if (token) {
                $window.localStorage.setItem("token", token);
            } else {
                $window.localStorage.removeItem("token");
            }
        }; 
        //AuthToken.getToken();    
        authTokenFactory.getToken = function() {
          return $window.localStorage.getItem("token");  
        };
        
        return authTokenFactory;
    })
    
    .factory("AuthInterceptors", function(AuthToken) {
        var authInterceptorsFactory = {};
        
        authInterceptorsFactory.request = function(config) {
            var token = AuthToken.getToken();
            
            if (token) config.headers['x-access-token'] = token;
            
            return config;
        };
        
        return authInterceptorsFactory;
    });
    
})();