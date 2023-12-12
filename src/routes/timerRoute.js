const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');



router
    .route('/:user_id/timer')
    .post(timerController.createATimer)



module.exports = router;
