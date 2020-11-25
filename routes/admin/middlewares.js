const { validationResult } = require('express-validator')

module.exports = {

    handleErrors() {

        return (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.send(errors)
            }
            next()
        }



    },
    requireAuth(req, res, next) {

       
      if (!req.session.userId) {
        
        return res.redirect('/login');
      }
      console.log('authenticated')
      next();
    }
}