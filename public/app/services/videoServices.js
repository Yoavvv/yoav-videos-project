angular.module("videoServices", [])

.factory("Video", function($http) {
    videoFactory = {};
    
    videoFactory.create = function(videoData) {
        videoData.userName = localStorage.getItem('userName');
        return $http.post("/videosForm", videoData);
    }
    
    videoFactory.getVideos = function() {
        var userName = localStorage.getItem('userName');
        return $http.get("/getVideos/" + userName);
    }
    videoFactory.editVideo = function(videoData) {
        var userName = localStorage.getItem('userName');
        var reqBody = Object.assign(videoData, {userName: userName});
        return $http.put("/editVideo/", reqBody );
    }
    videoFactory.deleteVideo = function(videoId) {
        var userName = localStorage.getItem('userName');
        var reqBody = {userName: userName, _id: videoId}
        return $http.put("/deleteVideo/", reqBody);
    }
    
    return videoFactory;
});