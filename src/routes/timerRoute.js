const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/timer')
    .all(jwtMiddleware.verifyToken)
    .post(timerController.createATimer)
    .get(timerController.getATimer)

router
    .route('/timer/avg')
    .get(jwtMiddleware.verifyToken,timerController.calculateAvgTimer)

module.exports = router;
