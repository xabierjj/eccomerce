const express = require('express')
const path = require('path');

const multer = require('multer');
const {v4:uuidv4} = require('uuid')


const router = express.Router()
const productsRepo = require('../../repositories/products')
const {handleErrors,requireAuth,requireJwtAuth} = require('./middlewares')

const {createProduct,getUsersProducts} = require('../../controllers/products')

const { requireName, requirePrice } = require('./validators');
const { send } = require('process');
const products = require('../../repositories/products');

//midleware para multipart forms[archivos, imagenes]
const upload = multer({ storage: multer.memoryStorage() })


router.get('/admin/products', requireJwtAuth,getUsersProducts )

router.get('/admin/products/:id', requireJwtAuth,async  (req, res) => {
    
    const product = await productsRepo.getOne(req.params.id)
    res.send(product)

    
})




router.get('/admin/products/:id/edit',requireAuth, async  (req, res) => {
   
   

   const product = await productsRepo.getOne(req.params.id)
    if (!product) {
        return res.send('No existe ese producto')
    }
    
    
    res.send(product)
    
})

router.get('/admin/products/:id/delete', async  (req, res) => {
   
   

   await productsRepo.delete(req.params.id)
   
    res.send({msg:'Borrado correctamente'})
     
 })



router.post('/admin/products/:id/edit', upload.single('imagen'),[requireName, requirePrice], handleErrors(), async  (req, res) => {
   
    const id = req.params.id
    const changes =req.body
    console.log(changes,id)

    if (req.file) {

        const nameSplit = req.file.originalname.split('.')
        const fileExtension = nameSplit[nameSplit.length -1]

        const validExtensions = ['png', 'jpg' , 'jpeg', 'gif']

        if (!validExtensions.includes(fileExtension)) {
            return res.status(400).json({
                ok:false,
                msg:'No es una extension válida'
            })
        }


        const fileName = `${uuidv4()}.${fileExtension}`

        //Path para guardar la imagen

        const image=req.file.buffer.toString('base64')
        changes.image=image
        console.log(req.file)
    }
   
   
   
    try {

        await productsRepo.update(id ,changes)
       

        res.send({msg:'Editado correctamente'})

    } catch (err) {
        
        res.send('No existe el producto')
    }

 
 })



// el middleware upload.single('imagen') tambien parseara los otros fields del form , upload.single('imagen')
router.post('/admin/products/new' ,[requireName, requirePrice],requireJwtAuth , handleErrors(),createProduct)

module.exports = router