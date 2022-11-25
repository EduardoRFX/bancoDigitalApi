require('dotenv').config()
const userRepository = require('../respositorie/userRepository')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const { sign } = require('jsonwebtoken')

const cadastrar = async function (usuario) {
    const existUser = await userRepository.encontrarUmPorWhere({ username: usuario.username })

    if (existUser) {
        return createError(422, 'Username já existente!')
    }

    const conta = await userRepository.contaCadastrado()

    usuario.password = await bcrypt.hash(usuario.password, ~~process.env.SALT)
    usuario.accountId = conta.id
    const usuarioCriado = await userRepository.usuarioCadastrado(usuario)
    return usuarioCriado
}

const buscarConta = async function (userId, contaId) {
    const user = await userRepository.encontrarPorId(userId)
}

const encontrarPorId = async function (id) {
    const usuario = await userRepository.encontrarPorId(id)

    if (!usuario) {
        return createError(404, 'Usuário não encontrado!')
    }

    return usuario
}

const login = async function (usuario) {
    const usuarioLogin = await userRepository.encontrarUmPorWhere({
        username: usuario.username
    })

    if (!usuarioLogin) {
        return createError(401, 'Usuário inválido')
    }

    const comparacaoSenha = await bcrypt.compare(usuario.password, usuarioLogin.password)

    if (!comparacaoSenha) {
        return createError(401, 'Usuário inválido')
    }

    const token = sign({
        id: usuarioLogin.id
    }, process.env.SECRET, { expiresIn: '24h' })
    delete usuarioLogin.password

    return {
        auth: true,
        usuario: usuarioLogin,
        token: token
    }
}


module.exports = {
    cadastrar: cadastrar,
    login: login,
    buscarConta: buscarConta,
    encontrarPorId: encontrarPorId
}