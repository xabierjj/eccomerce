
const express = require('express');
const bodyParser = require('body-parser');
const birds = require('./prueba');
const cookieSession = require('cookie-session');
//añade a req la propiedad session , req.session
const usersRepo = require('./repositories/users');

//const usersRepo = new UsersRepository()
const { json } = require('express');
 

const app = express();

// la ruta es root/panpizza o root/about
app.use('/root',birds)
app.use(bodyParser.urlencoded({extended:true}) )
app.use(cookieSession({
    keys: ['kjakaslkskldsapkksocn']
}))

app.get('/signup', (req, res) => {

    res.send(`<form method='POST'>  
        <input type='email' name='email'></input>
        <input type='password' name='password'></input>
        <input type='password' name='passwordConfirmation'></input>
        <input type='submit' name='submit' value='Registrar'></input>
        </form>`);



})





  
  



app.post('/signup', async (req,res)=> {
    console.log(req.body)

    const {email,password, passwordConfirmation} = req.body
    
    const exisitngUser = await usersRepo.getOneBy({email})

    if (exisitngUser) {
        return res.send('Ya existe una cuenta con ese email')
    }
    
    if (password !== passwordConfirmation) {
        return res.send('Contraseñas dferentes');
      }
    
      res.send('Cuenta creada');


      const user =await usersRepo.create({email:email,password:password})


      req.session.userId = user.id;

})

app.get('/signout', (req,res)=> {
    req.session=null;
    req.send('Log Out')
})

app.get('/signin', (req,res)=> {
    res.send(`<form method='POST'>  
        <input type='email' name='email'></input>
        <input type='password' name='password'></input>
       
        <input type='submit' name='submit' value='Iniciar sesion'></input>
        </form>`);

})

app.post('/signin', async (req,res)=> {
    const {email,password} = req.body
    
    const user = await usersRepo.getOneBy({email})

    if (!user) {
        return res.send('No existe un usuario con esa contraseña')
    }

    if (user.password!=password ) {
        return res.send('La contraseña no es correcta')
    }

    req.session.userId = user.id
    res.send('Signin page')
})

app.listen(3000, () => {

    console.log('listening')
})


