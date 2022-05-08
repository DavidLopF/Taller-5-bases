const { Router } = require('express');
const router = Router();
const ProductController = require('../controllers/product-controller');
const productController = new ProductController();


router.route('/')
    .post([], (req, res) => {
        productController.create(req, res);
    })

router.route('/top5')
    .get((req, res) => {
        productController.getTop5(req, res);
    })

router.route('/suggest_product')
    .get((req, res) => {
        productController.suggestProduct(req, res);
    })



module.exports = router;