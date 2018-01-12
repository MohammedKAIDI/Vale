"use strict"
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vale");
let Schema = mongoose.Schema; 

let User = new Schema({
    name : String
});

let userModel = mongoose.model("users",User);

module.exports = {
getUsers : function () {
        var u = new userModel({name:"Mohammed"}).save(function(error,user){
            userModel.find({}, function(req,res){
                // testing 
            });
        });
}
};