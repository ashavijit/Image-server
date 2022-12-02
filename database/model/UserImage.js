import mongoose, { Schema } from 'mongoose';

const userImageSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

export const UserImage = new mongoose.model("UserImage",userImageSchema);