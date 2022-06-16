const express = require('express');
const usuarioController = require('../controllers/userController');
const auth = require("../middlewares/auth");

const userRoutes = express.Router(); 

userRoutes.get('/', function(req,res){
    res.json({message: "rodando"})
})

userRoutes.post('/usuario', usuarioController.registerUser)
userRoutes.post('/authenticate',usuarioController.authUser )
userRoutes.post('/authlegal',auth, usuarioController.authLegal )

module.exports = userRoutes; 