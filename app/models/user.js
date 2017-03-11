var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var titlize = require("mongoose-title-case");
var validate = require("mongoose-validator");
var Video = require("./video");

var nameValidator = [
    validate({
        validator: "matches",
        arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
        message: "Name must be at least 3 characters, max 30, no special characters or numbers in between name."
    }),
    validate({
        validator: "isLength",
        arguments: [3, 20],
        message: "Name should be between {ARGS[0]} and {ARGS[1]} characters."
    })
];

var userNameValidator = [
    validate({
        validator: "isLength",
        arguments: [3, 25],
        message: "Username should be between {ARGS[0]} and {ARGS[1]} characters."
    }),
    validate({
        validator: "isAlphanumeric",
        message: "Username must contain letters and numbers only."
    })
];

var passwordValidator = [
    validate({
        validator: "matches",
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\w]).{8,35}$/,
        message: "Password needs to be at least one lower case, one uppercase, one number, one special character, and must be at between 8 - 35 characters totally."
    }),
    validate({
        validator: "isLength",
        arguments: [8, 35],
        message: "Password should be between {ARGS[0]} and {ARGS[1]} characters."
    })
];

var UserSchema = new Schema({
        name: { type: String, required: true, validate: nameValidator },
        userName: { type: String, lowercase: true, required: true, unique: true, validate: userNameValidator},
        password: { type: String, required: true, validate: passwordValidator },
        videos: [{_id: {type:Schema.ObjectId}, video:Object}]
});

UserSchema.pre("save", function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.plugin(titlize, {
    paths: [ "name" ]    
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model("User", UserSchema);

