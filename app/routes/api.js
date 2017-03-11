var User        = require("../models/user");
var jwt         = require("jsonwebtoken");
var secret      = "secretSentence";
var ObjectId = require("mongojs").ObjectId;

//USER REGISTRATION ROUTE
module.exports = function(router) {
        router.post("/users", function(req, res) {
        var user = new User();
        user.userName = req.body.userName;
        user.password = req.body.password;
        user.name     = req.body.name;
            
        if(req.body.userName === null || req.body.userName === "" || req.body.password === null || req.body.password === "" || req.body.name === null || req.body.name === "") {
            res.json({success: false, message: "Ensure name, Username & password were provided"});
        } else {
            
            user.save(function(err) {
                console.log(err);
                if(err) {
                    var validationErrors = [];
                    if(err.errors != null) {
                        if(err.errors.name) {
                            validationErrors.push('Name');
                        }  
                        if (err.errors.userName) {
                            validationErrors.push('Username');
                        } 
                        if (err.errors.password) {
                            validationErrors.push('Password');
                        }
                        
                        if(validationErrors.length > 0){
                            var message = 'Following fields were not supplied correctly: ';
                            validationErrors.forEach(function(field){
                               message +=  field + ', ';
                            })
                            message = message.substr(0, message.length-2);
                            if(!err.errors.name && !err.errors.userName && !err.errors.password) {
                                message += '\n' + err;
                            }
                            res.json({success: false, message: message}); 
                        }
                    } else if (err) {
                        if(err.code == 11000) {
                            res.json({success: false, message: "Username already taken!!"});
                        } else {
                        res.json({success: false, message: err }); 
                        }
                    }
                } else {
                    res.json({success: true, message: "User created!"});
                }
            });
        }   
});
    

//USER LOGIN ROUTE
    router.post("/authenticate", function(req, res) {
        
        User.findOne({ userName: req.body.userName }).select("userName password").exec(function(err, user) {
            if (err) throw err;
            
            if(!user) {
                res.json({ success: false, message: "Could not authenticate user!!" });
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, message: "No password provided!!" });
                }
                
                if(!validPassword) {
                    res.json({ success: false, message: "Could not authenticate password!!" });
                } else {
                    var token = jwt.sign({ userName: user.userName }, secret, { expiresIn: "24h"} );
                    res.json({ success: true, message: "User authenticated!!", token: token });
                }
            }
        });
    });
    
    router.post("/currentUser", function (req, res) {
        
       var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                 res.json({ success: false, message: "Token invalid!!" });
                } else {
                    req.decoded = decoded;
                    res.send(req.decoded);
                }
            });
            } else {
              res.json({ success: false, message: "No token provided!!" });  
            }
        });
    
    router.post("/videosForm", function(req, res) {
        var videoJson = {
            title: req.body.title,
            category: req.body.category,
            desc: req.body.desc,
            link: req.body.link
        }
        var userName = req.body.userName;
    
        if(req.body.title == null || req.body.title == "" || req.body.category == null || req.body.category == "" || req.body.desc == null || req.body.desc == "" || req.body.link == null || req.body.link == "") {
           res.json({ success: false, message: "Ensure you entered a valid youtube link!!!" }); 
        } else {
                User.update(
                    {userName: userName},
                    {
                        $push: {
                            videos: {
                                _id:ObjectId(),
                                video: videoJson
                                
                            } 
                        }
                    }
                ).exec().then(function(data){
                    if(data.ok === 0){
                         res.json({ success: false, message: "Could not add video" }); 
                    } else {
                         res.json({ success: true, message: "Video created", }); 
                    }
                });
        }  
    });
    
    router.get("/getVideos/:userName", function(req, res) {
        User.findOne(
            {userName: req.params.userName}
        ).exec().then(function(userData){
            if(userData === null){
                 res.json({ success: false, message: "No such username" }); 
            } else {
                res.json({ success: true, message: "Video created", videos: userData.videos }); 
            }
        
        })
    });
    
    router.put('/editVideo/', function(req, res){
        User.update(
                    {userName: req.body.userName},
                    {
                        $pull: {
                            videos: {
                                _id: req.body._id
                                
                            } 
                        }
                    }
                ).exec().then(function(data){
                    User.update(
                    {userName: req.body.userName},
                    {
                        $push: {
                            videos: {
                                _id:req.body._id,
                                video: req.body.video  
                            } 
                        }
                    }
                    ).exec().then(function(data){
                        if(data.ok === 0){
                         res.json({ success: false, message: "Could not edit video" }); 
                    } else {
                         res.json({ success: true, message: "Video edited successfully" }); 
                    }
                    })                   
                });
        
    });
    
    router.put('/deleteVideo/', function(req, res){
        User.update(
                    {userName: req.body.userName},
                    {
                        $pull: {
                            videos: {
                                _id: req.body._id
                                
                            } 
                        }
                    }
                ).exec().then(function(data){
                    if(data.ok === 0){
                         res.json({ success: false, message: "Could not delete video" }); 
                    } else {
                         res.json({ success: true, message: "Video deleted successfully" }); 
                    }
                })
    });
    

        
    return router;
}




