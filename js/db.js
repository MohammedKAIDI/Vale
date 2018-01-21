"use strict"
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vale");
let Schema = mongoose.Schema; 

let User = new Schema({
    username : String, 
    email: String, 
    password: String
});
let Messages = new Schema({
    body:String, 
    datePublish:Date
});
let userModel = mongoose.model("users",User);
let msgModel = mongoose.model('messages',Messages);
module.exports = {
getUsers :  () => {
        let u = new userModel({name:"Mohammed"}).save(function(error,user){
            userModel.find({}, function(req,res){
                // testing 
            });
        });
},
register: (userInfo, funk ) => {
    userModel.find({username:userInfo.username}, function(error, user){
        if(error == null )
        { 
            let user = new userModel({ username:userInfo.username, password:userInfo.password, email:userInfo.email}).save(function(error, user){
                console.log("user found  + "+ user);
                if(user){
                    return funk(null,"ok");
                if(error)
                    return funk("ko",null);
                }
            });
        }
        if(error != null ){
            return funk("ko",null);
        }
    })
},
login: (userInfo, funk ) => {
    userModel.findOne({username:userInfo.username, password:userInfo.password}, function(error, user){
        console.log("user = "+ user +" error = "+ error);
        if(user != null )
                    return funk(null,"ok");
        if(user == null ){
                     return funk("ko",null);
        }
    });
}, 
registerMessage : (msg, fn ) => {
    new msgModel({body:msg,datePublish:new Date()}).save(function(ko, ok)  {
        if(ok) return fn("ok",null);
        else return fn(null, "ko");
    });
},
getNotes : (result) => {
    msgModel.find({},function(err, notes){
        if(notes)
         return result(notes, err) 
         else return result(null,"error : impossible to get notes");
    });
}, 
deleteNote : (id, result) => {
        msgModel.remove({_id:id},function(err, ok){
            if(ok)
             return result(ok, err) 
             else return result(null,"error : impossible to get notes"); 
})
}
};