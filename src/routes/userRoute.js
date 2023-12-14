const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router
    .route('/register')
    .post(userController.register)


router
    .route('/login')
    .post(userController.login)

router
    .route('users/:user_id')
    .put(userController.updateAUser)
    // .patch(userController.)
    .delete(userController.deleteAUser)


module.exports = router;
