require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//añade a req la propiedad session , req.session
const cookieSession = require('cookie-session');

//routes
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products')
const productsRouter = require('./routes/products')


//DB
const {dbConnection} = require('./database/config')

const app = express();

dbConnection()
app.use(cors())
app.options('*', cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

//para poder parsear los datos json pasados desde angular
app.use(bodyParser.json())


// hacemos la carpeta public accesible a todo el mundo . Asi se podran acceder a los archivos del cliente css,js,imagenes
app.use(express.static('public'))
//midleware para forms con enctype urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
    keys: ['kjakaslkskldsapkksocn']
}))
app.use(authRouter)
app.use(adminProductsRouter)
app.use(productsRouter)


app.listen(process.env.PORT, () => {

    console.log('listening')
})


