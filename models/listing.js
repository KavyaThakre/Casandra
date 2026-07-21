const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const Review=require("./reviews.js")

const listingSchema=new Schema({
    title:String,
    description:String,
    image:{
        filename:String,
        url: {
    type: String,
    default: "https://www.tradeindia.com/delhi/hotel-interior-designers-city-228067.html",
    set: (v) =>
        v === ""
            ? "https://imgs.search.brave.com/3Qj4W_-m8q5B9jvGwSRWRpV5CyPYkkmNqqezUw2TeIo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c3RvY2tzbmFwLmlv/L2ltZy10aHVtYnMv/MjgwaC9ob3RlbC1i/ZWRfT0pMT0lZVko5/Qi5qcGc"
            : v
}

        
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            default:"Point"
        },
        coordinates:{
            type:[Number],
            default:undefined
        }
    }

})

listingSchema.post("findOneAndDelete",async(listing)=>{
   
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
    
})
const Listing=new mongoose.model("Listing",listingSchema);


module.exports=Listing;