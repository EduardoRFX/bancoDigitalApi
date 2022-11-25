const userService = require('../service/userService.js')
const { validationResult } = require('express-validator')
const createError = require('http-errors')
const accountsRepository = require('../respositorie/accountRepository')
const userRepository = require('../respositorie/userRepository')

const cadastrar = async function(req, res, next) {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() })
        }
        const response = await userService.cadastrar(req.body)
        
        if (response && response.message) {
            throw response;
        }
        res.send(response)

    }catch(error){
        return next(error)
    }
}

const buscarConta = async function(req, res, next) {
    try{
        const user = await userService.encontrarPorId(req.usuario_id)
        const conta = await accountsRepository.encontrarPorId(user.accountId)
        
        res.json(conta)
    } catch(error) {
        next(error)
    }
}

const login = async function(req, res, next) {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() })
        }
        const response = await userService.login(req.body)

        if (response && response.message) {
            throw response
        }

        res.send(response)

    }catch (error) {
        return next(error)
    }
}

const cashOut = async function(req, res, next) {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() })
        }

        const valor = req.body.value
        const userOut = await userService.encontrarPorId(req.usuario_id)
        const userIn = await userRepository.encontrarUmPorWhere({ username: req.body.username })

        if (userOut.username === userIn.username) {
            throw createError(422, 'Não é possivel realizar transferências para si mesmo!')
        }

        
        const contaUserOut = await accountsRepository.encontrarPorId(userOut.accountId)
        const contaUserIn = await accountsRepository.encontrarPorId(userIn.accountId)
        
        if(valor > contaUserOut.balance) {
            throw createError(422, 'Não é possivel realizar a transferência, pois seus balance é menor que o valor de transferência')
        }
        const balanceOut = contaUserOut.balance - valor
        const balanceIn = contaUserIn.balance + valor

        await accountsRepository.atualizar({ balance:balanceOut }, userOut.id )
        await accountsRepository.atualizar({ balance:balanceIn }, userIn.id )
        
        await userRepository.criarTransaction(userOut.accountId, userIn.accountId, valor)

        res.send('Transação concluída!')
    
    }catch(error) {
        next(error)
    }
}

const buscarTranscts = async function(req, res, next) {
    
    try{
        const user = await userRepository.encontrarPorId(req.usuario_id)
        const transctsDebiteds = await userRepository.buscarDebitedTranscts(user.accountId)
        const transctsCrediteds = await userRepository.buscarCreditedTranscts(user.accountId)
        
        res.json([transctsDebiteds, transctsCrediteds])
    
    } catch(error) {
        next(error)
    }

}

const buscarTransctsPorData = async function(req, res, next) { 
    try{
        const transctionByDate = await userRepository.buscarTransctsPorData(req.body.createdAt) 
    
        res.json(transctionByDate)
    }catch(erro) {
        next(erro)
    }
}

module.exports = {
    cadastrar: cadastrar,
    login: login,
    buscarConta: buscarConta,
    cashOut: cashOut,
    buscarTranscts: buscarTranscts,
    buscarTransctsPorData:buscarTransctsPorData

}