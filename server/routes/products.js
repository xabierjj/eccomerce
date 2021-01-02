const express= require('express')
const router = express.Router()
const {getAllProducts,searchProduct} = require('../controllers/products')


router.get('/', getAllProducts)

router.get('/product/:term', searchProduct)



module.exports = router;