import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    picture:String,
    date:{
        type:Date,
        default:Date.now
    }
})

export const User = new mongoose.model("User",userSchema);