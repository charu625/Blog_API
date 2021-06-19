const express = require('express');
const adminController = require('../controllers/admin-controller');
const router=express.Router();

//post requests
router.post('/login',adminController.adminLogin);
router.post('/signup',adminController.adminSignup);

module.exports= router;