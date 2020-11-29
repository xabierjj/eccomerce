
const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')


const SECRET_KEY = 'jjewfijqdpnqpowjwq';


const { handleErrors } = require('./middlewares')

const usersRepo = require('../../repositories/users')
const path = require('path');
const router = express.Router()
const signupTemplate = require('../../views/admin/auth/signup')
const loginTemplate = require('../../views/admin/auth/login')
const { requireEmail, requirePassword, requirePaswordConfirmation, requirePaswordLogin, requireEmailExist } = require('./validators')

router.get('/signup', (req, res) => {


    //cargar el html de html/signin.html
    return res.sendFile(path.join(__dirname + '../../../html/signin.html'))

    //llama a la funcion  de ../../views/admin/auth/signup.js

    //return res.send(signupTemplate({ req }))



})


router.post('/signup',
    [
        requireEmail,
        requirePassword,
        requirePaswordConfirmation], handleErrors(), async (req, res) => {


            

            const { email, password } = req.body

            const user = await usersRepo.create({ email: email, password: password })
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id },
                SECRET_KEY, {
                expiresIn: expiresIn
            });

            req.session.userId = user.id;

            res.send({ accessToken: accessToken ,expiresIn:expiresIn})


        })

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('Log Out')
})

router.get('/login', (req, res) => {


    return res.sendFile(path.join(__dirname + '../../../html/login.html'))

    //return res.send(loginTemplate({}));

})

router.post('/login', [requireEmailExist, requirePaswordLogin], handleErrors(), async (req, res) => {


    const { email } = req.body;
    console.log(req.body)

    const user = await usersRepo.getOneBy({ email });

    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

    req.session.userId = user.id;

    console.log(req.session.userId)

    return res.send({ accessToken: accessToken ,expiresIn:expiresIn  });


})

module.exports = router;