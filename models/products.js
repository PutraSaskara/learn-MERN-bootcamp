const Sequelize = require('sequelize')
const sequelize = require('../util/database')
// 'products' itu nama dari tabel dari database mysql
const Product = sequelize.define('products', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price : {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl : {
        type: Sequelize.STRING,
        allowNull: false
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false
    },
    category : Sequelize.STRING,
    userId : Sequelize.INTEGER,
    
},
{
    // agar nama table bisa berbeda dengan di database
    freezeTableName: true,
    // tableName: ''untuk mencocokan nama
},
);
module.exports = Product