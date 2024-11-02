const express = required("express")

const app = express();

app.get("/",(req, res) =>{
    console.log("Hello World") 
})