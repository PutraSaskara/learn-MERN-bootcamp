const Sequelize = require('sequelize')

const sequelize = new Sequelize('ecommerce', 'user1', 'user123',
{
    dialect:'mysql',
    host: 'localhost',
})

module.exports = sequelize