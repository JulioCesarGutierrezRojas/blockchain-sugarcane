process.loadEnvFile()
const express = require('express')
const cors = require('cors')

const tokenRoutes = require('../routes/token.routes.js');

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(cors({ origins: '*' }))
app.use(express.json({ limit: '50mb' }))

app.get('/', (request, response) => {
  response.send('Blockchain Backend is running')
})

app.use('/api/token', tokenRoutes);

module.exports = {
    app
}