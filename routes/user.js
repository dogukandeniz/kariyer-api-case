const express = require('express');
const router = express.Router();

const userController = require("../controllers/user");

//Get a list of all post
router.get('/', userController.getAllUsers);

//Get a post by term expression
router.get('/find', userController.findUsersByTerm);


module.exports = router;

