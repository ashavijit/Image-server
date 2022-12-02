import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import allRoutes from "./routes/allRoutes.js";
import cookieSession from 'cookie-session';
import passport from 'passport';
import  './passPort.js';
import './database/connection/conn.js'


const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit:"50mb"}));

app.use(
    cookieSession({
        name:"session",
        keys:["cyberwolve"],
        sameSite:'none',
        secure:true,
        maxAge:24*60*60*100,
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin : ['https://phtogall.netlify.app','http://localhost:3000'],
    credentials:true
}))

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/",allRoutes);
app.all("*",(req,res)=>{
    res.send("Url doesn't exist");
})

app.listen(port,()=>{
    console.log(`Server is running in port : http://localhost:${port}`);
})