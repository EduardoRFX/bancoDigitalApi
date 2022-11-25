const { body } = require('express-validator')
const { validatorMessage, tamanhoMinimoUser, tamanhoMinimoPass } = require('../utils/errorMessage')

const cadastrar = function () {
    return [
        body('username', tamanhoMinimoUser('Username')).isLength({ min: 3 }),
        body('username', validatorMessage('Username')).exists().bail().isString().bail(),
        body('password', tamanhoMinimoPass('Password')).isLength({ min: 8 }),
        body('password', validatorMessage('Password')).isStrongPassword({
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1,
            minSymbols: 0, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10,
            pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10
        })

    ]
}
const cashOut = function () {
    return [
        body('username', tamanhoMinimoUser('Username')).isLength({ min: 3 }),
        body('username', validatorMessage('Username')).exists().bail().isString().bail(),
    ]
}


module.exports = {
    cadastrar: cadastrar,
    cashOut: cashOut
}
