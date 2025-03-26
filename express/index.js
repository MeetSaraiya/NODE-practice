import express from 'express';

const app = express();

app.get("/",(req,res)=>{
    res.send("No Page");
});

app.get("/home",(req,res)=>{
    res.send("Home page")
})

app.listen(3000,)