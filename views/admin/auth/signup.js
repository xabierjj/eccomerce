
const layout = require('../layout')

const {getError} = require('../../helpers')

// //errors.mapped() devuelve un objeto con atributos email, password y passwordConfirmation 



module.exports = ({ req, errors }) => {




    return layout({
        content: `<div>Id : ${req.session.userId}
    <form method='POST'>  
    <input type='email' name='email'></input>
    ${getError(errors,'email')}
    <input type='password' name='password'></input>
    ${getError(errors,'password')}
    <input type='password' name='passwordConfirmation'></input>
    ${getError(errors,'passwordConfirmation')}
    <input type='submit' name='submit' value='Registrar'></input>
    </form></div>` });
}