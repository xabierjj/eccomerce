
const express = require('express');
const bodyParser = require('body-parser');
const birds = require('./prueba');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products')

//añade a req la propiedad session , req.session
const cookieSession = require('cookie-session');






//const usersRepo = new UsersRepository()
const { json } = require('express');


const app = express();

// hacemos la carpeta public accesible a todo el mundo . Asi se podran acceder a los archivos del cliente css,js,imagenes
app.use(express.static('public'))
//midleware para forms con enctype urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
    keys: ['kjakaslkskldsapkksocn']
}))
app.use(authRouter)
app.use(productsRouter)


app.listen(3000, () => {

    console.log('listening')
})


