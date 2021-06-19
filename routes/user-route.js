const express= require('express');
const router= express.Router();
const userController= require('../controllers/user-controller');
//Post requests
router.post('/login',userController.userLogin);
router.post('/signup',userController.userSignup);
router.post('/postBlog', userController.postBlog);

//Get request
router.get('/getUser/:username', userController.getUser);
router.get('/getBlog/:username/:blog', userController.getBlog);
module.exports= router;