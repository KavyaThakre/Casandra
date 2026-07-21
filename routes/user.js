const express=require("express");
const router=express.Router();
const User=require("../models/user.js")
const wrapAsync=require("../util/async.js");
const passport = require("passport");
const{saveUrl}=require("../middelware.js")
const userController=require("../controllers/users.js")
router.get("/user",userController.userForm)
router.post("/signup",wrapAsync(userController.signup))



router.route("/login")
.get(userController.loginUser)
.post(saveUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.loginPost)


router.get("/logout",userController.logoutUser)

module.exports=router;