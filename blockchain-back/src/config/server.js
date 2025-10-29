process.loadEnvFile()
const express = require('express')
const cors = require('cors')



const app = express()

app.set('port', process.env.PORT || 3000)

app.use(cors({ origins: '*' }))
app.use(express.json({ limit: '50mb' }))

app.get('/', (request, response) => {
  res.send('Blockchain Backend is running')
})



module.exports = {
    app
}