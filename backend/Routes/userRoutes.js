const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')

router.get('/getUsers',UserController.getUsers)
router.post('/postUser',UserController.postUser)
router.post('/login',UserController.login)
router.delete('/deleteUser/:id',UserController.deleteUser)
router.put('/editUser/:id',UserController.editUser)


module.exports = router;