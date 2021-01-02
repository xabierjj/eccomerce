const productRepo = require('../repositories/products')
const userRepo = require('../repositories/user')


const createProduct = async (req, res) => {

    const id = req.user.id

    const user = await userRepo.find({ _id: id }, { multiple: false })

    console.log(user)

    if (!user) {
        return res.status(404).json({
            ok: false,
            msg: "No existe ningún usuario con ese Id"
        })
    }


    const { title, price } = req.body;

    let product = {
        title: title,
        price: price,
        owner: req.user.id
    }

    try {

        const result = await productRepo.create(product)

        return res.json({

            product
        })
    }
    catch (err) {
        return res.status(500).json({
            ok: false,
            msg: 'Ha habido algún error'
        });
    }

}


const getAllProducts = async (req, res) => {


    try {
        let products = await productRepo.getAllproducts()


        return res.send({
            ok: true,
            products: products
        })

    } catch (err) {
        console.log(err)

        return res.status(500).json({
            ok: false,
            msg: 'Ha habido algún error'
        });
    }
}


const searchProduct = async (req, res) => {

    console.log(req.params)


    try {
        const products = await productRepo.searchTerm(req.params.term,'title')

        return res.send({
            ok: true,
            products: products
        })
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            ok: false,
            msg: 'Ha habido algún error'
        });
    }



    return res.status(404).json({
        ok: false,
        msg: req.params.term
    })

}



const getUsersProducts = async (req, res) => {

    const id = req.user.id

    const user = await userRepo.find({ _id: id }, { multiple: false })

    console.log(user)

    if (!user) {
        return res.status(404).json({
            ok: false,
            msg: "No existe ningún usuario con ese Id"
        })
    }


    try {
        let products = await productRepo.find({ owner: id }, { multiple: false })


        res.send({
            ok: true,
            products: products
        })

    } catch (err) {

        return res.status(500).json({
            ok: false,
            msg: 'Ha habido algún error'
        });
    }
}

//res.redirect('/admin/products')





module.exports = { createProduct, getAllProducts, searchProduct ,getUsersProducts}