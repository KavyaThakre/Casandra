const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/async.js")
const {listingSchema,reviewSchema}=require("../schema.js")
const ExpressError=require("../util/ExpressError");
const reviews=require("../models/reviews.js")
const Listing = require("../models/listing");
const {validateReview,isLoggedIn,isAuthor}=require("../middelware.js");
const { deleteReview } = require("../controllers/reviews.js");
const reviewController=require("../controllers/reviews.js")


//create post
router.post("/:id/reviews",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))
//delete post
router.delete("/:id/reviews/:review",isAuthor,isLoggedIn,wrapAsync(reviewController.deleteReview))

module.exports=router;