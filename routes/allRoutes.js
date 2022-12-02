import express from "express";
import passport from 'passport';
import {loginFailed,loginCheck,logoutUser,addImages,getImages,deleteImage} from '../controllers/index.js'

const router = express.Router();

router.get('/auth/login/failed',loginFailed);
router.get('/auth/login/success',loginCheck);
router.get('/auth/logout',logoutUser);
router.post('/user/addimages',addImages);
router.post('/user/deleteimage',deleteImage);
router.get('/user/getimages',getImages);


router.get("/auth/google/callback",passport.authenticate("google",{
    failureRedirect:'/auth/login/failed'
}),(req,res)=>{
    res.redirect("https://phtogall.netlify.app/dashboard")
})

router.get("/google",passport.authenticate("google",{ scope: ['profile','email'] }))

export default router;