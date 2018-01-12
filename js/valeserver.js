"use strict";

let express = require("express");
let app = express();
let bodyParser = require('body-parser');
let db = require("./db.js");
db.getUsers();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("../views/"));



app.get("/",(req, res) => {
        res.sendFile("../views/index.html");
});





app.listen(9494, () => {
});