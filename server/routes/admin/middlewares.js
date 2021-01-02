const { validationResult } = require('express-validator')



const jwt = require('jsonwebtoken');
module.exports = {

    handleErrors() {

        return (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
              let response = {
                error: true,
                errors:errors
              }

                return res.send(response)
            }
            next()
        }



    },
    requireAuth(req, res, next) {

       
      if (!req.session.userId) {
         
        console.log('No estas autenticado')
        return res.send({error:true, msg:'No estas autenticado'});
      }
      console.log('authenticated')
      next();
    },

    requireJwtAuth(req,res,next) {
      const authHeader = req.headers['authorization'];

      console.log(authHeader)

      if (authHeader) {
        console.log('Buenas')
        const token = authHeader.split(' ')[1];
        payload = jwt.decode(token, process.env.SECRET_KEY);
       
        
        if (token == null) return res.sendStatus(401)
       
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
          
            if (err)  {
              console.log(err)
              return res.sendStatus(403);
            }
            console.log('user')
           
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
    }
}