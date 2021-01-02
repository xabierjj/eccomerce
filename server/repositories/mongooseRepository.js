// const {Schema,model}  = require('mongoose')

module.exports = class MongooseRepository {


    constructor(Model) {
        this.collection = Model
        console.log('Model')

        console.log(Model)
    }

    async count() {
        return this.collection.estimatedDocumentCount()
    }

    async find(query = {}, { multiple = true } = {}) {
        console.log(multiple)
        const results = multiple ? await this.collection.find(query) : await this.collection.findOne(query)

        return results
    }

    async findPagination(query = {}, { limit = 5, offset = 0 }) {


        try {


            const [results, total] = await Promise.all([
                this.collection.find(query).skip(offset).limit(limit),
                this.collection.count()
            ])




            return { ok: true, results: results, total: total }
        } catch (err) {
            return {
                ok: false,
                msg: 'Error inesperado'
            }
        }
    }

    async create(body) {

        try {
            const document = new this.collection(body)
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


    async searchTerm(term, attr) {

        const regex = new RegExp(term, 'i')
        let query = {}
        query[attr] = regex

        console.log(query,term,attr)
        const result = await this.collection.find(query)

        return result

    }


    async update(id, body = {}) {
        const result = await this.collection.findOneAndUpdate({ _id: id }, body, { new: true })
        return result
    }

    async remove(id) {
        await User.findOneAndRemove({ _id: id })

        return { msg: 'deleted' }
    }
}

