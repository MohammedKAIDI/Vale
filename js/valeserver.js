"use strict";

let express = require("express");
let app = express();
let http = require("http");
let bodyParser = require('body-parser');
let db = require("./db.js");
let formidable = require('formidable');
let fs = require("fs-extra");
let path = require('path');
let session = require("session");
db.getUsers();


app.use(express.static("../../Vale/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("../views/"));



app.get("/",(req, res) => {
        res.sendFile("../views/index.html");
});

app.listen(9494, () => {

});

app.get("/mypage",function(req,res){
        res.sendfile( path.resolve( "../views/mypage.html"));

});

app.post("/register", function(req,res){
        let info = req.body;
        let userInfo = {username:info.usernamesignup, password:info.passwordsignup, email:info.emailsignup};
        console.log(userInfo);
        db.register(userInfo, function(error, success) {
                console.log("success = "+ success);
                if(success) 
                        res.redirect("/mypage");
                
                else{
                        res.redirect("/")
                }
        });
});

app.post("/login", function(req, res){
        let info = req.body;
        let userInfo = {username:info.username, password:info.password};
        console.log(userInfo);
        db.login(userInfo, function(error, success) {
                if(success=="ok")
                        res.redirect("/mypage");
                else{
                        res.redirect("/")
                }
        });
});

app.post("/fileupload", function(req, res){
        console.log("req "+ req.body.data);
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          res.write('File uploaded');
          console.log(files.filetoupload.name);
          res.end();
        });
        form.on('end', function(fields, files) {
                /* Temporary location of our uploaded file */
                var temp_path = this.openedFiles[0].path;
                /* The file name of the uploaded file */
                var file_name = this.openedFiles[0].name;
                /* Location where we want to copy the uploaded file */
                var new_location = '/home/d3vos/Desktop/COPPPPPPy';
                fs.copy(temp_path, new_location + file_name, function(err) {  
                    if (err) {
                        console.error(err);
                    } else {
                        res.send("OK");
                        console.log("success!")
                    }
                });
            });
          
});