const { check, validationResult } = require('express-validator')
const usersRepo = require('../../repositories/users')

module.exports = {

    requireName: 
    check('name')
    .trim()
    .isLength({min:5, mas:40})
    
    ,
    requirePrice:
    check('precio')
    .trim()
    .toFloat()
    .isFloat({min:1})
    
    ,
    requireEmail:
        check('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('Email no valido')
            .custom(async (email) => {
                const exisitngUser = await usersRepo.getOneBy({ email })

                if (exisitngUser) {
                    throw new Error('Ya existe una cuenta con ese email')
                }
            }),

    requirePassword:
        check('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Tiene que tener entre 4 y 20 caracteres'),

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
                
                const user = await usersRepo.getOneBy({ email })


                if (!user) {
                    throw new Error('No existe un usuario con esa email')
                }

            }),
    requirePaswordLogin:
        check('password')
            .trim()
            .custom(async (password, { req }) => {
                const user = await usersRepo.getOneBy({email: req.body.email })
                 if (!user) {
                    throw new Error('Email no valido')     
                 }
                const validPass = await usersRepo.comparePasswords(user.password, password)

                if (!validPass) {
                    throw new Error('La contraseña no es correcta')
                }
            }),

}