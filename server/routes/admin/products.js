const express = require('express')
const path = require('path');

const multer = require('multer');

const router = express.Router()
const productsRepo = require('../../repositories/products')
const {handleErrors,requireAuth} = require('./middlewares')

const { requireName, requirePrice } = require('./validators');
const { send } = require('process');
const products = require('../../repositories/products');

//midleware para multipart forms[archivos, imagenes]
const upload = multer({ storage: multer.memoryStorage() })


router.get('/admin/products', requireAuth,async  (req, res) => {

    


    return res.sendFile(path.join(__dirname + '../../../html/products.html'))


    
    
})

router.get('/admin/products/get',requireAuth, async  (req, res) => {

    const product = await productsRepo.getAll()   
    res.send(product)

    
})




router.get('/admin/products/:id/edit',requireAuth, async  (req, res) => {
   
   

   const product = await productsRepo.getOne(req.params.id)
    if (!product) {
        return res.send('No existe ese producto')
    }
    
    
    res.send(product)
    
})

router.post('/admin/products/:id/delete',requireAuth, async  (req, res) => {
   
   

   await productsRepo.delete(req.params.id)
   


     
     
     res.send(true)
     
 })



router.post('/admin/products/:id/edit',requireAuth, upload.single('imagen'),[requireName, requirePrice], handleErrors(), async  (req, res) => {
   
    const id = req.params.id
    const changes =req.body

    if (req.file) {
        const image=req.file.buffer.toString('base64')
        changes.image=image
    }
   
   
   
    try {

        await productsRepo.update(id ,changes)
        res.send('Updateado')

    } catch (err) {
        
        res.send('No existe el producto')
    }


   
    
     
 })


router.get('/admin/products/new',requireAuth ,(req, res) => {
    return res.sendFile(path.join(__dirname + '../../../html/product.html'))
})

// el middleware upload.single('imagen') tambien parseara los otros fields del form
router.post('/admin/products/new',requireAuth , upload.single('imagen'),[requireName, requirePrice], handleErrors(),async (req, res) => {
   
    const image=req.file.buffer.toString('base64')
    const {title,price}=req.body;
   
    await productsRepo.create({title,price,image})
    //res.redirect('/admin/products')
    return res.send([])
})

module.exports = router