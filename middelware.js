const Listing=require("./models/listing.js")
const Review=require("./models/reviews.js")
const {listingSchema,reviewScehma}=require("./schema.js")
const ExpressError=require("./util/ExpressError");


module.exports.isLoggedIn=(req,res,next)=>{
     if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
       
        req.flash("error","Login Please")
        return res.redirect("/login")
    }
    next();
}
module.exports.saveUrl=((req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
})
module.exports.isOwner=(async (req,res,next)=>{
    let {id}=req.params;
    let newList= await  Listing.findById(id);
       if(!newList.owner._id.equals(req.user._id)){
        req.flash("error","Not Authorised");
        return res.redirect(`/listing/show/${id}`);
       }

       next()
      
})
module.exports.validateReview=(req,res,next)=>{
   
     const result = Review.validate(req.body);

   

    if (result.error) {
        throw new ExpressError(
            400,
            result.error.details[0].message
        );
    }

    next();
}
module.exports.validateListing = (req, res, next) => {
    

    const result = listingSchema.validate(req.body);

   

    if (result.error) {
        throw new ExpressError(
            400,
            result.error.details[0].message
        );
    }

    next(); 
};
module.exports.isAuthor=(async (req,res,next)=>{
    let {review,id}=req.params;
    let newReview= await  Review.findById(review);
    
       if(!newReview.author.equals(req.user._id)){
        req.flash("error","Not Authorised");
        return res.redirect(`/listing/show/${id}`);
       }

       next()
      
})