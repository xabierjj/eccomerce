const crypto = require('crypto')
const MongooseRepository = require('./mongooseRepository')
const UserModel = require('../models/user')
//importamos libreriaa util para poder convertir funciones que usan callbacks en promesas
const util = require('util');
//convertimos la funcion scrypt [usada para guardar salt+pass hasheado]  en una promesa
const scrypt = util.promisify(crypto.scrypt)
class User extends MongooseRepository {


    async comparePasswords(saved, supplied) {
        const salt = saved.split('.')[1]
        console.log(saved, supplied)
        const buf = await scrypt(supplied, salt, 64)

        const hashed = `${buf.toString('hex')}.${salt}`;
        console.log(hashed===saved)

        return hashed === saved
    }


    async create(attrs) {

        try {



            const salt = crypto.randomBytes(8).toString('hex')

            const buf = await scrypt(attrs.password, salt, 64)

            // Cogemos los atributos attrs  y sobrescribimos el atributo password
            const record = {
                ...attrs,
                password: `${buf.toString('hex')}.${salt}`
            }

            const document = new this.collection(record)
            await document.save()

            return {
                ok: true,
                document: document
            }


        } catch (err) {
            console.log(err)
            return {
                ok: false,
                msg: 'Error inesperado'
            }
        }

    }
}


module.exports = new User(UserModel);