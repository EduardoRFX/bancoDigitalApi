require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const handle404Error = require('./src/middlewares/handle404Error')

const router = require('./src/routes/ngCash.routes')
const handleError = require('./src/middlewares/handleError')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/ngCash/',router)
app.use(handle404Error)
app.use(handleError)

app.listen(process.env.PORTA, () => {
    console.log('CONECTADO!')
})