angular.module("videosController", ["videoServices"])

.controller("videosCtrl", function($http, $location, $timeout, Video, $scope) {
    
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchVideo   = '';     // set the default search/filter term
    
    
    var app = this;
    
    this.regVideo = function(videoData) {
        app.loading = true;
        app.errorMsg = false;
        Video.create(app.videoData).then(function(data) {
            if (data.data.success) {
                app.loading = false;
                app.allVideos = data.data.allVideos;
                app.successMsg = data.data.message + "...Redirecting to videos page";
                $timeout(function() {
                    $location.path("/videos");
                }, 3000);  
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };
    
    $scope.saveEditedVideoInDb = function(videoData){
            Video.editVideo(videoData);
    };
    
    $scope.deleteVideo = function(video){
        Video.deleteVideo(video._id).then(function(){
            Video.getVideos().then(function(allVideos){
                    $scope.videoData = allVideos.data.videos;
                });
        });
    }
    
    $scope.searchTable = function(){  
         Video.getVideos().then(function(allVideos){
            //console.log(allVideos.data.videos.length);
                $scope.videoData = allVideos.data.videos;
                $scope.videoData = $scope.videoData.filter(function(video){
                    var shouldIncludeVideo = false;
	                   if(
                        video.video && (
                            (video.video.category &&video.video.category.indexOf($scope.searchVideo) >-1) ||
                            (video.video.title && video.video.title.indexOf($scope.searchVideo) >-1) ||
                            (video.video.link &&video.video.link.indexOf($scope.searchVideo) >-1) ||
                            (video.video.desc &&video.video.desc.indexOf($scope.searchVideo) >-1)
                            )
                        ){
                            shouldIncludeVideo = true;
                        }
                    return shouldIncludeVideo;
                }).sort(function(video1, video2){
                    return video1.video.title.toUpperCase() > video2.video.title.toUpperCase() ? 1 : -1;
                })
    });
    }
    
    
//     window.addEventListener('resize', function(event){
//            if($(window).width() <1000) {
//                $scope.under1000Px = true;
//            } else {
//               $scope.under1000Px = false; 
//            }
//        })
    
        
//    $scope.sortBy = function(field){
//        console.log(field);
//        $scope.videoData.sort(function(video1, video2){
//            return video1.video[field].toUpperCase() - video2.video[field].toUpperCase() ? -1 : 1;
//        })
//    }
    
    
//    $scope.PlayVideo = function(link){
//        $location.url('http://google.com');
//    }
    
    if($location.$$url === '/videos') {
        Video.getVideos().then(function(allVideos){
            //console.log(allVideos.data.videos.length);
            $scope.videoData = allVideos.data.videos;
        });
    }
});

