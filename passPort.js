import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from "./database/model/User.js";

passport.use(new GoogleStrategy({
        clientID: "835327698379-bf4tfkavjusq9tmd3q8uoni965o2ktlc.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "auth/google/callback",
        proxy:true,
        scope:["profile","email"]
    },
    async function(accessToken, refreshToken, profile, callback) {
        if(await User.findOne({email:profile._json.email})){
            // console.log(await User.findOne({email:profile._json.email}))
            return callback(null, profile._json);
        }else{
            const newUser = new User({
                name:profile._json.name,
                email:profile._json.email,
                picture:profile._json.picture
            });
            await newUser.save();
            return callback(null, profile._json);
        }
    }
));

passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})

