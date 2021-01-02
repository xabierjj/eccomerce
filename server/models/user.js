const {Schema,model}  = require('mongoose')


const UserSchema = Schema({

    name: {
        type:String,
        required: true

    },
    email: {
        type:String,
        required: true,
        unique:true

    },
    password: {
        type:String,
        required: true

    },
    image: {
        type:String,
        required: false
    },

    products: [{
        type: Schema.Types.ObjectId,
        ref:"Product",
        required:false
    }]
})

module.exports = model('User',UserSchema)