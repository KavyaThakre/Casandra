const Listing=require("../models/listing.js")
const {listingSchema,reviewScehma}=require("../schema.js")
const ExpressError=require("../util/ExpressError");
const {geocodeLocation}=require("../util/geocode.js");

module.exports.index=async (req,res)=>{
    
    let listings=await Listing.find();
    let {search}=req.query;
    if(search){
        listings = await Listing.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
                {location:{$regex:search,$options:"i"}},
                {country:{$regex:search,$options:"i"}}
            ]
        });
    }else{
        listings = await Listing.find();
    }
    res.render("listings/index",{listings,search})
}
module.exports.show=async (req,res)=>{
    let {id}=req.params;
    
    let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    let newlist=await Listing.findById(id);
    
    if(!listing){
        req.flash("error","Listing does not exists")
       return res.redirect("/listing");
    }
    let price=listing.price.toLocaleString('en-IN')
    
    res.render("listings/show",{listing,price:price})
}
module.exports.new=(req,res)=>{
   
    res.render("listings/newForm")
}
module.exports.add=async (req,res)=>{
    let data=req.body;
    
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(filename," ",url)
   const newlisting = await Listing.create(req.body.listing);
   newlisting.owner=req.user
   newlisting.image.url=url;
   newlisting.image.filename=filename;



   let geometry=await geocodeLocation(newlisting.location,newlisting.country);
   if(geometry){
       newlisting.geometry=geometry;
   }
    await newlisting.save();
    req.flash("success","New Listing Created")
    res.redirect(`/listing`)
}
module.exports.edit=async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    if(!list){
        req.flash("error","Listing does not exists")
       return res.redirect("/listing");
    }
    res.render("listings/editForm",{list})
}
module.exports.update=async (req,res)=>{
    let {id}=req.params;
  
    let list=await Listing.findById(id);
    let newlisting= await Listing.findByIdAndUpdate(id, req.body.listing);
     console.log(req.file)
    if(req.file){
         let url=req.file.path;
    let filename=req.file.filename;
    newlisting.image={url,filename};
   
    await newlisting.save()
    }
    if(list.location!==newlisting.location || list.country!==newlisting.country){
        let geometry=await geocodeLocation(newlisting.location,newlisting.country);
        if(geometry){
            newlisting.geometry=geometry;
            await newlisting.save();
        }
    }
     
    
    req.flash("success","Listing Updated")
    res.redirect(`/listing/${id}`);
}
module.exports.delete=async(req,res)=>{

    let {id}=req.params;
    
    
let deletedList=await Listing.findByIdAndDelete(id);
req.flash("success","Listing Deleted")
res.redirect("/listing")

}