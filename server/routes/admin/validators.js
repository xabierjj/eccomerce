const { check, validationResult } = require('express-validator')
const userRepo = require('../../repositories/user')

module.exports = {

    requireName:
        check('title')
            .trim()
            .isLength({ min: 5, mas: 40 })
            .withMessage('Tiene que tener entre 5 y 40 caracteres')
    ,
    requirePrice:
        check('price')
            .trim()
            .toFloat()
            .isFloat({ min: 1 })
            .withMessage('El precio tiene que ser mayor que uno')

    ,
    requireEmail:
        check('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('Email no valido')
            .custom(async (email) => {
                const exisitngUser = await userRepo.find({ email }, { multiple: false })
                console.log(exisitngUser)
                if (exisitngUser) {
                    throw new Error('Ya existe una cuenta con ese email')
                }
            }),

    requirePassword:
        check('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Tiene que tener entre 4 y 20 caracteres'),

    requireUserName:
        check('name')
            .trim()
            .isLength({ min: 3, mas: 12 })
            .withMessage('Tiene que tener entre 3 y 12 caracteres')
            .custom(async (name) => {
                console.log(name)
                const exisitngUser = await userRepo.find({ name }, { multiple: false })

                console.log(exisitngUser)
                if (exisitngUser) {
                    throw new Error('Ya existe una cuenta con ese nombre')
                }
            })
    ,

    requirePaswordConfirmation:
        check('passwordConfirmation')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Tiene que tener entre 4 y 20 caracteres')
            .custom(async (passwordConfirmation, { req }) => {
                if (req.body.password !== passwordConfirmation) {
                    throw new Error('Contraseñas dferentes');
                }
            }),

    requireEmailExist:
        check('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('Email no valido')
            .custom(async (email) => {
                console.log(email)
                const user = await userRepo.find({ email: email })


                if (!user) {
                    throw new Error('No existe un usuario con esa email')
                }

            }),
    requirePaswordLogin:
        check('password')
            .trim()
            .custom(async (password, { req }) => {
                const user = await userRepo.find({ email: req.body.email }, { multiple: false })
                console.log(user)
                if (!user) {
                    throw new Error('Email no valido')
                }
                const validPass = await userRepo.comparePasswords(user.password, password)

                if (!validPass) {
                    throw new Error('La contraseña no es correcta')
                }
            }),

    requireEmailUpdate:
        check('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('Email no valido')
            
    ,

    requireNameUpdate:
        check('name')
            .trim()
            .isLength({ min: 3, mas: 12 })
            .withMessage('Tiene que tener entre 3 y 12 caracteres')
            

}