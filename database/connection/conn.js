import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://avijit:z9JWKszMVbDCOxpg@cluster0.urxlpae.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Database connection successfull...");
}).catch((err)=>{
    console.log(err);
});