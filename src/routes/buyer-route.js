const { Router } = require('express');
const router = Router();
const BuyerController = require('../controllers/buyer-controller');
const buyerController = new BuyerController();


router.route('/')
    .post((req, res) => {
        buyerController.create(req, res);
    })

module.exports = router;
