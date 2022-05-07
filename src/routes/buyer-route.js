const { Router } = require('express');
const router = Router();
const BuyerController = require('../controllers/buyer-controller');
const buyerController = new BuyerController();
const { check, validationResult } = require('express-validator');


router.route('/')
    .post((req, res) => {
        buyerController.create(req, res);
    })

router.route('/get_all')
    .get((req, res) => {
        buyerController.getAll(req, res);
    })

router.route('/recommend_product')
    .post(/*[
        check('name').isString().withMessage('Name must be a string'),
        check('name').not().isEmpty().withMessage('Name must not be empty'),
        check('product').isString().withMessage('Product must be a string'),
        check('product').not().isEmpty().withMessage('Product must not be empty'),
        validationResult
    ],*/
        (req, res) => {
        buyerController.recommendProduct(req, res);
    })

module.exports = router;
