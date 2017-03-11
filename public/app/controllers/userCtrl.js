(function(){
    
    "use strict";

    angular.module("userControllers", ["userServices"])
    
    .controller("regCtrl", function($http, $location, $timeout, User) {
        
        var app = this;
        
        this.regUser = function(regData) {
        //if(app.regData.userName && app.regData.password && app.regData.name){
            app.loading = true;
           app.errorMsg = false;
            User.create(app.regData).then(function(data) {
        
               if(data.data.success) {
                   app.loading = false;
                   app.successMsg = data.data.message + " Redirecting...";
                   $timeout(function() {
                       $location.path("/"); 
                   }, 3000);
                  
               } else {
                   app.loading = false;
                   app.errorMsg = data.data.message;
               }
           });
       // }
            
           
       }; 
    });
    
})();