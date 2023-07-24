const { Op } = require('sequelize');
const Product = require('../models/products')
const products = []

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;


    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        category: category,

    }).then(result => {
        console.log(result.toJSON());
        console.log("product sukses di tambah")
    }).catch(err => {
        console.log(err)
    })

    res.redirect("/shop")
}

exports.getProducts = (req, res, next) => {
const query = req.query

if(!query) {
    Product.findAll().then(result => {
        res.json({data: result, total: result.length})
    }).catch(err => {
        console.log(err)
    })
}else{
    Product.findAll({
        where: {
            // like artinya seperti (artinya untuk mencari yg mendekati)
            title: {[Op.like] : `%${query.title}%`},
            price: {[Op.gt] : query.price},
            // gt great than (lebih besar dari)
            // lt less than (lebih)

            [Op.or] : [
                {category : "Kaos"},
                {category: "Topi"}
            ]
            // or artinya untuk mencari 2 kategori
        }
    }).then(result => {
        res.json({data: result, total: result.length})
    }).catch(err => {
        console.log(err)
    })
}

    }

    exports.getProduct = (req, res, next) => {
        const prod_id = req.params.id

        Product.findByPk(prod_id).then(result => {
            res.json({data: result, total: result.length})
        }).catch(err => {
            console.log(err)
        })
        }

// edit product
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.id
    const updateTitle = req.body.title
    const updatePrice = req.body.price
    const updateImageUrl = req.body.imageUrl
    const updateDeskripsi = req.body.description

    Product.findByPk(prodId).then(resultProd => {
        resultProd.title = updateTitle
        resultProd.description = updateDeskripsi
        resultProd.price = updatePrice
        resultProd.imageUrl = updateImageUrl

        return resultProd.save()
    }).then(resultSave => {
        console.log("product berhasil diupdate")
        res.json(resultSave)
    }).catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.id

    Product.findByPk(prodId).then(resultProd => {
        return resultProd.destroy()
    }).then(resultDel => {
        console.log("Product Sukses di Hapus")
        res.json(resultDel)
    }).catch(err => console.log(err))

    
}