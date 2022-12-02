import { User } from "../database/model/User.js";
import { UserImage } from "../database/model/UserImage.js"

export const addImages = async (req,res)=>{
    if(req.user){
        let images = req.body.images;
        const getUser = await User.find({email:req.user.email});
        for(let i=0;i<images.length;i++){
            const newUserImage = new UserImage({
                imageUrl:images[i].toString(),
                user:getUser[0]._id
            });
            await newUserImage.save();
        }
        res.status(200).json({
            error:false,
            message:"Successfully image added",
            user:req.user,
        })
    }else{
        res.status(403).json({
            error:true,
            message:"Not Authorized"
        })
    }
}
export const deleteImage = async (req,res)=>{
    if(req.user){
        let imageid = req.body.id;
        const getUser = await User.find({email:req.user.email});
        await UserImage.deleteOne({user:getUser[0]._id,_id:imageid});
        res.status(200).json({
            error:false,
            message:"Successfully image deleted",
            user:req.user,
        })
    }else{
        res.status(403).json({
            error:true,
            message:"Not Authorized"
        })
    }
}
export const getImages = async (req,res)=>{
    try{
        if(req.user){
            const getUser = await User.find({email:req.user.email});
            // console.log(getUser[0]._id)
            const images = await UserImage.find({user:getUser[0]._id});
            if(images.length){
                res.status(200).json({
                    error:false,
                    message:"Successfully got images",
                    images:images,
                    user:req.user,
                })
            }else{
                res.status(206).json({
                    error:false,
                    message:"Images are not present",
                    user:req.user,
                })
            }
        }else{
            res.status(403).json({
                error:true,
                message:"Not Authorized"
            })
        }
        
    }catch(err){
        res.status(403).json({
            error:true,
            message:"Not Authorized"
        })
    }
}

export const loginFailed = (req,res)=>{
    res.status(401).json({
        error:true,
        message:"Log in failed"
    })
}
export const loginCheck = (req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Successfully logged in",
            user:req.user,
        })
    }else{
        res.status(403).json({
            error:true,
            message:"Not Authorized"
        })
    }
}

export const logoutUser = (req,res)=>{
    req.logout();
    res.redirect("https://phtogall.netlify.app");
}