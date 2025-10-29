process.loadEnvFile()
const express = require('express')
const cors = require('cors')

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));

// Importar rutas de usuario
const routes = require('../routes/routes');
const tokenRoutes = require('../routes/token.routes.js');
app.use('/api', routes);
app.use('/api/token', tokenRoutes);

app.get('/', (req, res) => {
    res.send('Blockchain Backend is running');
});

module.exports = { app };
