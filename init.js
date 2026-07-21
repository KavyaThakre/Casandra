const mongoose=require("mongoose");
const data=require("./models/data.js");
const Listing=require("./models/listing.js")
require("dotenv").config();

console.log(process.env.ATLAS_DB_URL);
async function main() {
    await mongoose.connect(process.env.ATLAS_DB_URL);
    console.log("Connected")
    await initDb();
    console.log("initialised")
}
main().then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
})

const initDb=async ()=>{
    await Listing.deleteMany({});
    const result = await Listing.insertMany(data);
   

}
