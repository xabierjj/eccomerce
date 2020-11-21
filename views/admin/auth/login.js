const layout = require('../layout')
const {getError} = require('../../helpers')
module.exports = ({errors} ) => {

    return layout({content:`<form method='POST'>  
    <input type='email' name='email'></input>
    ${getError(errors, 'email')}
    <input type='password' name='password'></input>
    ${getError(errors,'password')}
    <input type='submit' name='submit' value='Iniciar sesion'></input>
    </form>`});
}