const { Router } = require('express');
const router = Router();
const SellerController = require('../controllers/seller-controller');
const sellerController = new SellerController();
const { check } = require('express-validator');
const { validateData } = require('../middlewares/validate');

router.route('/')
    .post([
        check('name').isString().withMessage('name must be a string'),
        check('name').isLength({ min: 3 }).withMessage('name must be at least 3 characters'),
        check('name').not().isEmpty().withMessage('name must not be empty'),
        validateData
    ], (req, res) => {
        sellerController.create(req, res);
    })



module.exports = router;
