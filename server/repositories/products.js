const MongooseRepository = require('./mongooseRepository')
const ProductModel = require('../models/product')


class ProductRepositories extends MongooseRepository  {
   

    async getAllproducts() {

        
       return await this.collection.find({}).populate('owner', 'name')
    }
}

module.exports = new ProductRepositories(ProductModel);