const fs = require('fs');


//Repository Approach : Una clase es la responsable para el acceso de datos. Todo los registors se guardan y se usan como object JS. Es el caso que utilizaremos

//Active Record Approach: Cada registro es una instancia de cada modelo y este tendra metodos para guardar,update,borrar ese record
class UsersRepository {

    constructor(filename) {
        if (!filename) {
            throw new Error('Se necesita un archivo json');
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);

        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }

    }


    async getAll() {

        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf-8' }))
    }

    async create(attrs) {
        const records = await this.getAll();
        records.push(attrs);

        await this.writeAll(records);
      
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records,null,2))
    }
}



const test = async () => {
    const repo = new UsersRepository('users.json');

    const users = await repo.getAll();
    console.log(typeof users);
}

test()