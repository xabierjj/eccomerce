const { validationResult } = require('express-validator')

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
        
        return res.send({error:true, msg:'No estas autenticado'});
      }
      console.log('authenticated')
      next();
    }
}