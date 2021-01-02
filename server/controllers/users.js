
const jwt = require('jsonwebtoken');
const { createConnection } = require('mongoose');
const userRepo = require('../repositories/user')
const login = async (req, res) => {


    const { email } = req.body;

    try {
        const user = await userRepo.find({ email }, { multiple: false });
        console.log(user._id)
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: expiresIn });


        return res.json({
            ok: true,
            accessToken
        });

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            ok: false,
            msg: 'Ha habido algún error'
        });

    }




}

const signup = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await userRepo.create({ name: name, email: email, password: password })
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            process.env.SECRET_KEY, {
            expiresIn: expiresIn
        });

        return res.json({
            ok: true,
            accessToken
        });

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            ok: false,
            msg: 'Ha habido algún error'
        });
    }


}




const update = async (req, res) => {
    const id = req.user.id
    console.log(req.user,req.user.id)
    const attrs = req.body


    try {


        const user= await userRepo.find({_id:id}, { multiple :false } )

        console.log(user)

        if (!user) {
            return res.status(404).json({
                ok:false,
                msg:"No existe ningún usuario con ese Id"
            })
        }

        if (user.email == attrs.email) {
            delete attrs.email
        } else {
            const exisitngEmail = await userRepo.find({ email:attrs.email }, { multiple: false })
                console.log('exisitngUser')
                console.log(exisitngEmail )
                if (exisitngEmail) {
                    return res.status(400).json({
                        ok:false,
                        msg:"Ya existe un usuario con ese mail"
                    })
                }
        }

        if (user.name == attrs.name) {
            delete attrs.name
        } else {
            const exisitngName = await userRepo.find({ name:attrs.name }, { multiple: false })
                console.log('exisitngUser')
                console.log(exisitngName )
                if (exisitngName) {
                    return res.status(400).json({
                        ok:false,
                        msg:"Ya existe un usuario con ese nombre"
                    })
                }
        }




        const updatedUser= await userRepo.update(id, attrs)

        res.json({
            ok:true,
            user:updatedUser
        })

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            ok: false,
            msg: 'Ha habido algún error'
        });
    }
}

module.exports = {
    login, signup, update
}