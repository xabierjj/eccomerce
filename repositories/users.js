const fs = require('fs');
const crypto = require('crypto')


//Repository Approach : Una clase es la responsable para el acceso de datos. Todo los registors se guardan y se usan como object JS. Es el caso que utilizaremos

//Active Record Approach: Cada registro es una instancia de cada modelo y este tendra metodos para guardar,update,borrar ese record
 class UsersRepository {

    constructor(filename) {
        if (!filename) {
            throw new Error('Se necesita un archivo json');
        }

        this.filename = filename;

        //Usamos accessSyncc proque solo se llamara una vez a esta función y no se pueden usar await ene le constructor
        try {
            fs.accessSync(this.filename);

        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }

    }


    async getAll() {

        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf-8' }))
    }

    async getOne(id) {
        const records = await this.getAll();

        const user=records.find(user => {
            return user.id===id;
        });
        return user
    }

    async create(attrs) {
        attrs.id= this.randomId()
        const records = await this.getAll();
        records.push(attrs);

        await this.writeAll(records);
      
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records,null,2))
    }

    async delete(id) {
        const records = await this.getAll();
        const newRecords =records.filter(user=> {
            return user.id!==id
        })
        
        await this.writeAll(newRecords);
    }

    randomId() {

        return crypto.randomBytes(4).toString('hex')
    }

    async update(id,attrs) {
        const records = await this.getAll();
        const user=records.find(user => {
            return user.id===id;
        });

        if (!records) {
            throw new Error(`Usuario con id ${id} no existe `)
        }

        Object.assign(user,attrs)
       

        await this.writeAll(records);
    }


    async getOneBy(filters) {
        const records = await this.getAll();
    
        for (let record of records) {
          let found = true;
    
          for (let key in filters) {
            if (record[key] !== filters[key]) {
              found = false;
            }
          }
    
          if (found) {
            return record;
          }
        }
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