(function(){
    
    "use strict";

    var app = angular.module("appRoutes", ["ngRoute"]).config(function($routeProvider, $locationProvider) {

        $routeProvider

        .when("/", {
            templateUrl: "app/views/pages/home.html"
        })

        .when("/about", {
            templateUrl: "app/views/pages/about.html",
            controller: "videosCtrl",
            controllerAs: "videos"  
        })
        
        .when("/register", {
            templateUrl: "app/views/pages/users/register.html",
            controller: "regCtrl",
            controllerAs: "register",
            authenticated: false
        })
        
        .when("/login", {
            templateUrl: "app/views/pages/users/login.html",
            authenticated: false
        })
        
        .when("/logout", {
            templateUrl: "app/views/pages/users/logout.html",
            authenticated: true
        })
        
        .when("/profile", {
            templateUrl: "app/views/pages/users/profile.html",
            controller: "videosCtrl",
            controllerAs: "videos",
            authenticated: true
        })
        
        .when("/videos/playVideo", {
            templateUrl: "app/views/pages/videos/playVideo.html",
            controller: "playVideoCtrl",
            controllerAs: "play",
            authenticated: true
        })
        
        .when("/videos", {
            templateUrl: "app/views/pages/videos/videos.html",
            controller: "videosCtrl",
            controllerAs: "videos",
            authenticated: true
        })

        .otherwise({ redirectTo: "/"});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });
    
    app.run(["$rootScope","Auth", "$location", "User", function($rootScope, Auth, $location, User) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
             if (next.$$route !== undefined) {
                 if (next.$$route.authenticated === true) {
                if (!Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path("/");
                }
            } else if (next.$$route.authenticated === false) {
                if (Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path("/profile");
                }
            }
             }
            
            
        });
    }]);
    
})();