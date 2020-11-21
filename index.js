
const express = require('express');
const bodyParser = require('body-parser');
const birds = require('./prueba');
const authRouter = require('./routes/admin/auth');

const cookieSession = require('cookie-session');

//añade a req la propiedad session , req.session


//const usersRepo = new UsersRepository()
const { json } = require('express');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
    keys: ['kjakaslkskldsapkksocn']
}))
app.use(authRouter)


app.listen(3000, () => {

    console.log('listening')
})


