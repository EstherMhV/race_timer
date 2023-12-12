const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');

router
    .route('/users/:id_user/timers')
    .get(timerController.listAllTimers)
    .post(timerController.createATimer)

router
    .route('/timers/:id_timer')
    .get(timerController.getATimer)
    .put(timerController.updateATimer)
    .delete(timerController.deleteATimer)

module.exports = router;
