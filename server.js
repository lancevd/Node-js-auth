const express = require("express")

const app = express();

app.get("/",(req, res) =>{
    res.send("Hello world there")
})

app.post("/register", (res, req) {
    req.body.email = req.body.email.trim();

    if (!req.body.username){
        errors.push("You must enter a username")
    }
})

app.listen(5000)