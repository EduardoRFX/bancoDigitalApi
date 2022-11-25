const { Accounts } = require('../database/models/index')

const cadastrarConta = async function () {
    const usuarioCadastrado = await Accounts.create()
    return usuarioCadastrado
}

const encontrarPorId = async function(id) {
    const usuario = await Accounts.findByPk(id)
    return usuario
}

const atualizar = async function(usuario, id) {
    await Accounts.update(usuario, {
        where: { id: id }
    })
}


module.exports = {
    cadastrarConta: cadastrarConta,
    encontrarPorId: encontrarPorId,
    atualizar: atualizar
}