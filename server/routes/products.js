const express= require('express')
const router = express.Router()
const productsRepo = require('../repositories/products')


router.get('/', async (req,res)=> {

    let products = await productsRepo.getAll()

    // products = products.map((res)=> {

    //     res.image= 'data:image/png;base64, '+ res.image ;
    //     return res
    // })

    res.send(products)


})

module.exports = router;