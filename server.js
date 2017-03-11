var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express(),
    router      = express.Router(),
    appRoutes   = require("./app/routes/api")(router),
    path        = require("path"),
    port        = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(appRoutes);


mongoose.connect("mongodb://localhost:27017/listDB", function(err) {
   if(err) {
       console.log("Not connected to the database: " + err);
   } else {
       console.log("Connected to mongoDB!!!");
   }
});

mongoose.Promise = require('bluebird');

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/mainView.html'));    
});

app.listen(port, function() {
    console.log("Running the server on port : " + port);
});

