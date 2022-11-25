const { Users, Accounts, Transactions } = require('../database/models/index')

const contaCadastrado = async function () {

    const contaCadastrado = await Accounts.create()
    return contaCadastrado
}

const usuarioCadastrado = async function (usuario) {

    const usuarioCadastrado = await Users.create(usuario)
    return usuarioCadastrado
}

const encontrarPorId = async function(id) {
    const usuario = await Users.findByPk(id)
    return usuario
}

const encontrarUmPorWhere = async function(where) {
    const usuario = await Users.findOne({
		where: where
	});
	return usuario;
}

const criarTransaction = async function (debitedAccountId, creditedAccountId, value) {
    const transacao = await Transactions.create({
        debitedAccountId: debitedAccountId,
        creditedAccountId: creditedAccountId,
        value: value
    })
    return transacao
}

const buscarDebitedTranscts = async function(accountId) {
    const transcts = await Transactions.findAll({
        where: { debitedAccountId : accountId },
    })

    return transcts
}

const buscarCreditedTranscts = async function(accountId) {
    const transcts = await Transactions.findAll({
        where: { creditedAccountId : accountId },
    })

    return transcts
}

const buscarTransctsPorData = async function(data) {
    const transcts = await Transactions.findOne({
        where: { createdAt: data }
    })

    return transcts
}


module.exports = {
    usuarioCadastrado: usuarioCadastrado,
    encontrarUmPorWhere: encontrarUmPorWhere,
    contaCadastrado: contaCadastrado,
    encontrarPorId: encontrarPorId,
    criarTransaction: criarTransaction,
    buscarDebitedTranscts: buscarDebitedTranscts,
    buscarCreditedTranscts: buscarCreditedTranscts,
    buscarTransctsPorData: buscarTransctsPorData
}