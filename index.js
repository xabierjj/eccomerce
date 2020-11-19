
const express = require('express');
const bodyParser = require('body-parser');
const birds = require('./prueba');
const usersRepo = require('./repositories/users');

//const usersRepo = new UsersRepository()
const { json } = require('express');
 

const app = express();

// la ruta es root/panpizza o root/about
app.use('/root',birds)
app.use(bodyParser.urlencoded({extended:true}) )


app.get('/', (req, res) => {

    res.send(`<form method='POST'>  
        <input type='email' name='email'></input>
        <input type='password' name='password'></input>
        <input type='password' name='passwordConfirmation'></input>
        <input type='submit' name='submit' value='Registrar'></input>
        </form>`);



})





  
  



app.post('/', async (req,res)=> {
    console.log(req.body)

    const {email,pass, passConfim} = req.body
    
    const exisitngUser = await usersRepo.getOneBy({email})

    if (exisitngUser) {
        return res.send('Ya existe una cuenta con ese email')
    }
    
    if (pass !== passConfim) {
        return res.send('Contraseñas dferentes');
      }
    
      res.send('Cuenta creada');

})

app.listen(3000, () => {

    console.log('listening')
})


