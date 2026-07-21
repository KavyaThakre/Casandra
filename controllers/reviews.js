const Listing=require("../models/listing.js")
const reviews=require("../models/reviews.js")
module.exports.createReview=async (req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview= new reviews(req.body);
    newReview.author=req.user._id;
   
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
   res.redirect(`/listing/${req.params.id}`)
}
module.exports.deleteReview=async(req,res)=>{
   
    let {id,review}=req.params;
    await reviews.findByIdAndDelete(review);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:review}})

    res.redirect(`/listing/${id}`)
}