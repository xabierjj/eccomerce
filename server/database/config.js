
const mongoose = require('mongoose');
require('dotenv').config()


const dbConnection = async() => {


    try {
        await mongoose.connect(process.env.DB_CN, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Conectados a la BD')

    } catch (err) {
        throw new Error('Error a la hora de conectarse a la BD')
    }
}


module.exports= {
    dbConnection
}