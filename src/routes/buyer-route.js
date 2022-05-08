const { Router } = require('express');
const router = Router();
const BuyerController = require('../controllers/buyer-controller');
const buyerController = new BuyerController();
const { check } = require('express-validator');
const {validateData} = require('../middlewares/validate');


router.route('/')
    .post([
        check('name').isString().withMessage('name must be a string'),
        check('name').isLength({ min: 3 }).withMessage('name must be at least 3 characters'),
        check('name').not().isEmpty().withMessage('name must not be empty'),
        validateData
    ], (req, res) => {
        buyerController.create(req, res);
    })

router.route('/get_all')
    .get((req, res) => {
        buyerController.getAll(req, res);
    })

router.route('/recommend_product')
    .post([
        check('name').isString().withMessage('Name must be a string'),
        check('name').not().isEmpty().withMessage('Name must not be empty'),
        check('product').isString().withMessage('Product must be a string'),
        check('product').not().isEmpty().withMessage('Product must not be empty'),
        validateData
    ],
        (req, res) => {
        buyerController.recommendProduct(req, res);
    })

router.route('/buy')
    .post([
        check('name').isString().withMessage('Name must be a string'),
        check('name').not().isEmpty().withMessage('Name must not be empty'),
        check('product').isString().withMessage('Product must be a string'),
        check('product').not().isEmpty().withMessage('Product must not be empty'),
        validateData
    ], (req, res) => {
        buyerController.buy(req, res);
    })

module.exports = router;
