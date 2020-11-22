const fs = require('fs');
const crypto = require('crypto')


module.exports=class Repository {
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

    async create(attrs) {

        attrs.id = this.randomId()
        const records = await this.getAll()
        records.push(attrs)

        await this.writeAll(records)

        return attrs;


    }
    async getAll() {

        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf-8' }))
    }

    async getOne(id) {
        const records = await this.getAll();

        const user = records.find(user => {
            return user.id === id;
        });
        return user
    }

   


    

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
    }

    async delete(id) {
        const records = await this.getAll();
        const newRecords = records.filter(user => {
            return user.id !== id
        })

        await this.writeAll(newRecords);
    }

    randomId() {

        return crypto.randomBytes(4).toString('hex')
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const user = records.find(user => {
            return user.id === id;
        });

        if (!records) {
            throw new Error(`Usuario con id ${id} no existe `)
        }

        Object.assign(user, attrs)


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