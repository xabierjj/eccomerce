const {Schema,model}  = require('mongoose')

const ProductSchema = Schema({

    title: {
        type:String,
        required: true

    },

    price: {
        type:Number,
        required:true

    },

    owner: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
}) 



module.exports = model('Product',ProductSchema)