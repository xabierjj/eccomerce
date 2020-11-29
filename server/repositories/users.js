const fs = require('fs');
const crypto = require('crypto')
const Repository = require('./repository')

//importamos libreriaa util para poder convertir funciones que usan callbacks en promesas
const util = require('util');
//convertimos la funcion scrypt [usada para guardar salt+pass hasheado]  en una promesa
const scrypt = util.promisify(crypto.scrypt)


//Repository Approach : Una clase es la responsable para el acceso de datos. Todo los registors se guardan y se usan como object JS. Es el caso que utilizaremos

//Active Record Approach: Cada registro es una instancia de cada modelo y este tendra metodos para guardar,update,borrar ese record
class UsersRepository extends Repository  {

    async create(attrs) {
        attrs.id = this.randomId()
        const records = await this.getAll();

        const salt = crypto.randomBytes(8).toString('hex')

        const buf = await scrypt(attrs.password, salt, 64)

        // Cogemos los atributos attrs  y sobrescribimos el atributo password
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        }

        records.push(record);

        await this.writeAll(records);

        return record

    }

    async comparePasswords(saved, supplied) {

        console.log(saved)

        const salt = saved.split('.')[1]


        const buf = await scrypt(supplied, salt, 64)

        const hashed = `${buf.toString('hex')}.${salt}`;
        console.log(hashed===saved)

        return hashed === saved
        

    }
}

module.exports = new UsersRepository('users.json');

// const test = async () => {
//     const repo = new UsersRepository('users.json');


//     const users1 = await repo.getAll();
//     console.log( users1);

//     let user=await repo.getOneBy({email:'xab@gmail.com'})





//     console.log( user);
// }

// test()