
const express = require('express')

const { check, validationResult } = require('express-validator')

const usersRepo = require('../../repositories/users')
const path = require('path');
const router = express.Router()
const signupTemplate = require('../../views/admin/auth/signup')
const loginTemplate = require('../../views/admin/auth/login')
const { requireEmail, requirePassword, requirePaswordConfirmation,requirePaswordLogin,requireEmailExist } = require('./validators')

router.get('/signup', (req, res) => {


    //cargar el html de html/signin.html
    //res.sendFile(path.join(__dirname+'../../../html/signin.html'))

    //llama a la funcion  de ../../views/admin/auth/signup.js

    res.send(signupTemplate({ req }))



})


router.post('/signup',
    [
        requireEmail,
        requirePassword,
        requirePaswordConfirmation], async (req, res) => {
            
            
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.send(signupTemplate({req,errors}))
            }

            console.log(errors)
            const { email, password, passwordConfirmation } = req.body

            const user = await usersRepo.create({ email: email, password: password })

            req.session.userId = user.id;

            req.send('Cuenta creada')


        })

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('Log Out')
})

router.get('/login', (req, res) => {


    //res.sendFile(path.join(__dirname+'../../../html/login.html'))

    return res.send(loginTemplate({}));

})

router.post('/login',[requireEmailExist,requirePaswordLogin], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.send(loginTemplate({req,errors}))
    }

    req.send('Loggeado')
    req.session.userId = user.id

})

module.exports = router;