if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
    

}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const wrapAsync=require("./util/async.js")
const ExpressError=require("./util/ExpressError");
const {listingSchema,reviewScehma}=require("./schema.js")
const reviews=require("./models/reviews.js")
const userRouter=require("./routes/user.js")
const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/review.js")
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const req = require("express/lib/request");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const {isLoggedIn}=require("./middelware.js")
const {MongoStore} = require('connect-mongo');


app.use(methodOverride("_method"));
app.use(cookieParser("process.env.SESSION_SECRET"))

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))



const sessionOptions={
    store: MongoStore.create({
        mongoUrl: process.env.ATLAS_DB_URL,
        touchAfter: 24 * 3600 // seconds — see explanation below
    }),
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+1000*60*60*24*3,
        maxAge:1000*60*60*24*3,
        httpOnly:true
    }
}

app.use(session(sessionOptions))
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy (User.authenticate()));


passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

async function main() {
    await mongoose.connect(process.env.ATLAS_DB_URL);
}
main().then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
})
 
const validateReview=(req,res,next)=>{
   
     const result = reviewScehma.validate(req.body);

   

    if (result.error) {
        throw new ExpressError(
            400,
            result.error.details[0].message
        );
    }

    next();
}


app.get("/",(req,res)=>{
    console.dir(req.cookies)
    res.redirect("/listing")
})

app.use("/listing",listingRouter);

app.use("/listing",reviewRouter)
app.use("/",userRouter)

app.all("/*splat",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})
app.use((err,req,res,next)=>{
    let{status=500,message="Bad req"}=err;
    res.status(status).render("error.ejs",{message})
})
app.listen(8080,()=>{
    console.log("Running");
})