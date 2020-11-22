const express = require('express')
const path = require('path');
const {  validationResult } = require('express-validator')
const router= express.Router()
const productsRepo= require('../../repositories/products')

const {requireName,requirePrice} = require('./validators');
const { send } = require('process');




router.get('admin/products', (req, res) => {
    
})

router.get('/admin/products/new', (req,res)=> {
    return res.sendFile(path.join(__dirname+'../../../html/product.html'))
})


router.post('/admin/products/new',[requireName,requirePrice],(req,res)=> {
    const errors = validationResult(req)

    return res.send(errors)
})

module.exports = router