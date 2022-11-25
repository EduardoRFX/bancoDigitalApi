const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userValidator = require('../validators/userValidator')
const verifyJWT = require('../middlewares/authorizator')

router.post('/cadastrar', userValidator.cadastrar(), userController.cadastrar)
router.post('/login', userValidator.cadastrar(), userController.login)
router.get('/conta', verifyJWT, userController.buscarConta)
router.post('/cashOut', verifyJWT, userValidator.cashOut(), userController.cashOut)
router.get('/transcts', verifyJWT, userController.buscarTranscts)
router.post('/transcts/data', verifyJWT, userController.buscarTransctsPorData)

router.get('/', (req, res) => {
    res.send('TUDO CERTO')
})

module.exports = router