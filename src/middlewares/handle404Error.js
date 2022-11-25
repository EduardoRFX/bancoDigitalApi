const handle404Error = function(req, res) {
    res.status(400)
    res.send(['Não encontrado'])
}

module.exports = handle404Error