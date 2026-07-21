const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/async.js")
const {listingSchema,reviewScehma}=require("../schema.js")
const ExpressError=require("../util/ExpressError");
const Listing = require("../models/listing");
const {isLoggedIn,isOwner,validateReview,validateListing}=require("../middelware.js")
const listingController=require("../controllers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")

const upload = multer({ storage })


router.get("/new",isLoggedIn,listingController.new)

router.route("/:id")
.get(listingController.show)
.put(isLoggedIn,isOwner,validateListing,upload.single('listing[image][url]'),wrapAsync(listingController.update))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.delete))


router.route("/")
.get(listingController.index)
.post(upload.single('listing[image][url]'),isLoggedIn,validateListing,wrapAsync(listingController.add))



router.get("/editform/:id",isLoggedIn,isOwner,wrapAsync(listingController.edit))




module.exports=router;