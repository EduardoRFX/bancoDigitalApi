const accountRepository = require('../respositorie/accountRepository')

const cadastrar = async function(req, res) {
    try {
        const conta = await accountRepository.cadastrarConta()

        res.json(conta)
    }catch(error) {
        res.json({ message: error })
    }
}


module.exports = {
    cadastrar: cadastrar
}