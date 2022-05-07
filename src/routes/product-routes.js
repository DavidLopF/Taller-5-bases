const { Router } = require('express');
const router = Router();
const ProductController = require('../controllers/product-controller');
const productController = new ProductController();


router.route('/')
    .post([], (req, res) => {
        productController.create(req, res);
    })


module.exports = router;