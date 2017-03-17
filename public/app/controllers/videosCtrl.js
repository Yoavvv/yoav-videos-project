angular.module("videosController", ["videoServices"])

.controller("videosCtrl", function($http, $location, $timeout, Video, $scope) {
    
    var app = this;
    $scope.searchVideo = '';
    
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
    
    $scope.openConfirmDeleteVideo = function(video, index){
        var confirmDeleteSelector = '#confirm-delete_' +  index;
        $(confirmDeleteSelector).modal();
//            $(confirmDeleteSelector).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
//            
//            $('.debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
//        });
    }
    $scope.deleteVideo = function(video, index){
            var confirmDeleteSelector = '#confirm-delete_' +  index;
            $(confirmDeleteSelector).modal('hide');
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
    
    
    $scope.PlayVideo = function(video, index){
        var src = video.link;
        var videoModalSelector = '#videoModal_' +  index
        $(videoModalSelector).modal('show');
        $(videoModalSelector + ' iframe').attr('src', src);
        $(videoModalSelector + 'button').click(function () {
        $(videoModalSelector + ' iframe').removeAttr('src');
    });
    }
    
    if($location.$$url === '/videos') {
        Video.getVideos().then(function(allVideos){
            //console.log(allVideos.data.videos.length);
            $scope.videoData = allVideos.data.videos;
        });
    }
    
    
    
     $('#currentLink').click(function (video) {
         console.log($scope.videoData[6].video.link);
        var src = $scope.videoData[6].video.link;
        $('#myModal').modal('show');
        $('#myModal iframe').attr('src', src);
    });

    $('#myModal button').click(function () {
        $('#myModal iframe').removeAttr('src');
    });
    
    
    
    
//$('#myModal').on('show', function() {
//    var id = $(this).data('id'),
//        removeBtn = $(this).find('.danger');
//})
//
//$('.confirm-delete').on('click', function(e) {
//    e.preventDefault();
//
//    var id = $(this).data('id');
//    $('#myModal').data('id', id).modal('show');
//});
//
//$('#btnYes').click(function() {
//    // handle deletion here
//  	var id = $('#myModal').data('id');
//  	$('[data-id='+id+']').remove();
//  	$('#myModal').modal('hide');
//});
    
});

