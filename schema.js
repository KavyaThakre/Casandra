const Joi=require("joi")
module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        // image: Joi.object({
        //     url: Joi.string().allow("").required()
        // }).required(),
        price:Joi.number().required(),
        location:Joi.string().required(),
        country:Joi.string().required()
    }).required()

    
});
module.exports.reviewScehma=Joi.object({
    comment:Joi.string().required(),
    rating:Joi.string().required(),
    createdAt:Joi.date()
})