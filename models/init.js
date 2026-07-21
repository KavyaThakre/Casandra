const mongoose=require("mongoose");
const Listing=require("./listing.js");
const data=require("./data.js");



async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Casandra');


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
initDb();