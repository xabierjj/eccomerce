const express= require('express')
const router = express.Router()
const productsRepo = require('../repositories/products')


router.get('/', async (req,res)=> {

    const products = await productsRepo.getAll()
    res.send(products)


})

module.exports = router;