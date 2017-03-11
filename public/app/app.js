(function(){
    
    "use strict";

    angular.module("userApp", ["appRoutes", "userControllers", "userServices", "ngAnimate", "mainController", "authServices", "videosController", "videoServices"])
        
    .config(function($httpProvider) {
        $httpProvider.interceptors.push("AuthInterceptors");
    });
    
})();