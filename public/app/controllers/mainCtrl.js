(function(){
    
    "use strict";

    angular.module("mainController", ["authServices"])
    .controller("mainCtrl", function(Auth, $timeout, $location, $rootScope, $scope, $http) {
        
        $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
        };
        
        var app = this;
        
        app.loadMe = false;
        
        $rootScope.$on("$routeChangeStart", function() {
            var userName = localStorage.getItem('userName');
            $http.get("/getVideos/" + userName).then((function(allVideos){
                    app.videoCount = allVideos.data.videos.length;
                }));
            
            if (Auth.isLoggedIn()) {
                app.isLoggedIn = true;
                Auth.getUser().then(function(data) {
                    app.userName = data.data.userName;
                    
                    app.loadMe = true;
                    });
                    } else {
                        app.isLoggedIn = false;
                        app.userName = '';
                        app.loadMe = true;
                    }
            });
    
        this.doLogin = function() {
            app.loading = true;
            app.errorMsg = false;
            
            Auth.login(app.loginData).then(function(data) {
                if(data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message + " Redirecting...";
                    
                    $timeout(function() {
                        $location.path("/home");
                        app.loginData = '';
                        app.successMsg = false;
                    }, 3000);
                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message; 
                }
            });
        };
        
        this.logout = function() {
            Auth.logout();
            $location.path("/logout");
            $timeout(function() {
                $location.path("/");
            }, 3000);
        }
    });
    
})();