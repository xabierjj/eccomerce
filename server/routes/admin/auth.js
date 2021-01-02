require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const userRepo = require('../../repositories/user')

const SECRET_KEY = 'jjewfijqdpnqpowjwq';

//repositories
const usersRepo = require('../../repositories/users')
const {login, signup,update} = require('../../controllers/users')


const { handleErrors,requireJwtAuth } = require('./middlewares')


const router = express.Router()
const { requireEmail, requirePassword, requirePaswordConfirmation, requirePaswordLogin, requireEmailExist, requireUserName,requireEmailUpdate,requireNameUpdate} = require('./validators')


router.get('/users', async (req,res)=> {

    const offset = Number(req.query.offset) || 0
    console.log(offset)
    const result= await userRepo.findPagination({}, {offset})
    console.log(result)
    res.json(result)
})


router.post('/signup',
    [
        requireEmail,
        requirePassword,
        requireUserName,
        requirePaswordConfirmation], handleErrors(),signup)

// router.get('/signout', (req, res) => {
//     req.session = null;
//     res.send('Log Out')
// })



router.post('/login', [requireEmailExist, requirePaswordLogin], handleErrors(), login)


router.put('/user',[requireEmailUpdate,requireNameUpdate], handleErrors() , requireJwtAuth ,update)



module.exports = router;









// async (req, res) => {


//     const { email } = req.body;
//     console.log(req.body)

//     const user = await usersRepo.getOneBy({ email });

//     const expiresIn = 24 * 60 * 60;
//     const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: expiresIn });

//     req.session.userId = user.id;

//     console.log(accessToken)

//     //return res.send({ accessToken: accessToken ,expiresIn:expiresIn  });

//     return res.json({
//         accessToken
//     });


// }



// const { email, password } = req.body

//             const user = await usersRepo.create({ email: email, password: password })
//             const expiresIn = 24 * 60 * 60;
//             const accessToken = jwt.sign({ id: user.id },
//                 process.env.SECRET_KEY, {
//                 expiresIn: expiresIn
//             });

//             req.session.userId = user.id;

//             //res.send({ accessToken: accessToken ,expiresIn:expiresIn})

//             return res.json({
//                 accessToken
//             });