const express = require('express')
const router = express.Router()
const cartsRepo = require('../repositories/carts')
const productsRepo = require('../repositories/products')




// Recibir post para añadir producto al  carro
router.post('/cart/add/:id', async (req, res) => {
    //existe un carrito del usurio?
    let cart;
    if (!req.session.cartId) {
        //El usuario no tiene un carro
        cart = await cartsRepo.create({ items: [] })
        req.session.cartId = cart.id

    } else {
        //tiene carr, sacarlo de la db
        cart = await cartsRepo.getOne(req.session.cartId)
    }
    const itemId = req.params.id

    let product = cart.items.find((item)=> {return item.id===itemId})

    if (product) {
         //incrementar el numero del producto
         product.quantity++;
    } else {
        //añadir producto nuevo al carro

        cart.items.push({id:itemId, quantity:1})
    }

    await cartsRepo.update(cart.id, {items: cart.items})
    

    //o

    

})
// Recibir get para enseñar productos del  carro
router.get('/cart', async (req, res) => {

    if (!req.session.cartId) {
        return res.redirect('/')
    }

    const cart = await cartsRepo.getOne(req.session.cartId)

    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id)
        item.product=product
    }

    return res.send(cart.items)

})
// Recibir post para borrar producto al  carro

router.post('/cart/delete/:id', async (req, res) => {
    const itemId = req.params.id
    const cart = await cartsRepo.getOne(req.session.cartId)
    const items = cart.items.filter(item=> item.id !== itemId)
    await cartsRepo.update(req.session.cartId, {items})


})

module.exports = router