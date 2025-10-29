const sequelize = require('../config/database')

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection to the database has been established successfully.')

        await sequelize.sync({ alter: true })
        console.log('All models were synchronized successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = connectToDatabase