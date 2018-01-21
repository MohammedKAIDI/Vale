"use strict";

let express = require("express");
let app = express();
let http = require("http");
let bodyParser = require('body-parser');
let db = require(__dirname + "/js/db.js");
let formidable = require('formidable');
let fs = require("fs-extra");
let path = require('path');
let session = require("session");
db.getUsers();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/views/index.html");
});

app.get("/mypage", function (req, res) {
        res.sendfile(path.resolve(__dirname + "/views/mypage.html"));     
});

app.post("/saveNote", function(req,res){
       db.registerMessage(req.body.msg, function(ok, ko){
               console.log(ok);
                if(ok) res.send("ok");
                else res.send("ko");
       });
});
app.post("/getNotes", function(req,res){
        db.getNotes(function(notes,error){
                res.send(notes);
        });
});
app.post("/deleteMesg",function(req,res){
        db.deleteNote(req.body.id,function(ok,error){
                res.send("ok");
        });
});
app.post("/register", function (req, res) {
        let info = req.body;
        let userInfo = { username: info.usernamesignup, password: info.passwordsignup, email: info.emailsignup };
        console.log(userInfo);
        db.register(userInfo, function (error, success) {
                console.log("success = " + success);
                if (success)
                res.redirect("/mypage");
                
                else {
                        res.redirect("/")
                }
        });
        
});
app.post("/chat", function (req, res) {
        res.end();
});
app.post("/login", function (req, res) {
        let info = req.body;
        let userInfo = { username: info.username, password: info.password };
        console.log(userInfo);
        db.login(userInfo, function (error, success) {
                if (success == "ok")
                res.redirect("/mypage");
                else {
                        res.redirect("/")
                }
        });
});
app.listen(9495, () => {
        
});
app.post("/fileupload", function (req, res) {
        console.log("req " + req.body.data);
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
                //  res.write('File uploaded');
                console.log(files.filetoupload.name);
                //res.end();
        });
        form.on('end', function (fields, files) {
                /* Temporary location of our uploaded file */
                var temp_path = this.openedFiles[0].path;
                /* The file name of the uploaded file */
                var file_name = this.openedFiles[0].name;
                /* Location where we want to copy the uploaded file */
                var new_location = '/home/d3vos/Desktop/COPPPPPPy';
                fs.copy(temp_path, new_location + file_name, function (err) {
                        if (err) {
                                console.error(err);
                        } else {
                                res.send("OK");
                                console.log("success!")
                        }
                });
        });
});