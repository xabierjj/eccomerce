console.log('olaaaa');
const express = require('express');

const app = express();
app.use(bodyParser.urlencoded({extended:true}) )

const bodyParser = require('body-parser');

app.get('/', (req, res) => {

    res.send(`<form method='POST'>  
        <input type='email' name='email'></input>
        <input type='password' name='password'></input>
        <input type='password' name='passwordConfirmation'></input>
        <input type='submit' name='submit'></input>
        </form>`);



})



app.post('/', (req,res)=> {
    console.log(req.body)

})

app.listen(3000, () => {

    console.log('listening')
})