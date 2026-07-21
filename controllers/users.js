const User=require("../models/user")


module.exports.signup=async (req,res)=>{
    try{
        let{username,email,password}=req.body;
    const newUser=new User({email,username});
    await User.register(newUser,password);
    
    req.login(newUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Casandra")
    res.redirect("/listing")
    })
    
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/user")
    }
}
module.exports.userForm=(req,res)=>{
    res.render("users/signup.ejs")
}
module.exports.loginUser=(req,res)=>{
    res.render("users/login.ejs")
}
module.exports.loginPost=async (req,res)=>{
req.flash("success","Welcome Back To Casandra")
let redirectUrl=res.locals.redirectUrl||"/listing"
res.redirect("/listing")
}
module.exports.logoutUser=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success","You are logged out now");
        res.redirect("/listing")
    })
}