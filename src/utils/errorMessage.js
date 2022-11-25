const validatorMessage = function(atributo) {
    return `A propriedade '${atributo}' é invalida ): `
}

const tamanhoMinimoUser = function(atributo) {
    return `A propriedade '${atributo}' deve ter no minimo 3 caracteres!`
}

const tamanhoMinimoPass = function(atributo) {
    return `A propriedade '${atributo}' deve ter no minimo 8 caracteres!`
}

const notExist = function(atributo) {
    return `${atributo} não existe`
}


module.exports = {
    validatorMessage: validatorMessage,
    notExist: notExist,
    tamanhoMinimoUser: tamanhoMinimoUser,
    tamanhoMinimoPass: tamanhoMinimoPass
}
