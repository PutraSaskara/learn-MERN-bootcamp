const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products')

// artinya /admin/product
router.post('/products', (req, res, next) => {
    console.log(req.body)
    res.redirect('/shop')
})

router.post('/edit-products', productsController.postEditProduct)

router.delete('/delete-product', productsController.postDeleteProduct)

// /admin/add-products
router.post("/add-products", productsController.postAddProduct)

module.exports = router;