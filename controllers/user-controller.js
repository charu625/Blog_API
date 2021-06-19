const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const User= require('../models/user-model');
const HttpError= require('../utils/Httperror');
const Blog=require('../models/blog-model');

//Signup Function
const userSignup= async(req,res,next)=>{

    const{ firstname, lastname,email,password,dob,role}= req.body;
    
    //Check for email already in use
    let existingUser;
    try{
        existingUser= await User.findOne({
            email:email
        });
    }catch(err){
        const error= new HttpError('Something went wrong!!',500);
        return next(error);
    }

    if(existingUser){
        const error=new HttpError('Email already in use.Please signup with another email',403);
        return next(error); 
    }

    //Password encryption
    let hashedPassword;
    try{
        hashedPassword= await bcrypt.hash(password,12);
    }catch(err){
        const error= new HttpError('Something went wrong!!', 500);
        return next(error);
    }

    //Create a user
    const createUser=new User({
        firstname: firstname,
        lastname:lastname,
        email:email,
        password:hashedPassword,
        dob:dob,
        role:'User'        
    });

    //Save user in DB
    try{
        await createUser.save();
    }catch(err){
        const error= new HttpError('Something went wrong!!',500);
        return next(error);
    }
    return res.status(200).json({
        message:"User signed up"
    });
};

//Login Function
const userLogin= async(req,res,next)=>{

    const{email,password}= req.body;
    //Check for email is correct or not
    let existingUser;
    try{
        existingUser= await User.findOne({
            email:email
        });
    }catch(err){
        const error= new HttpError('Something wrong!!' , 500);
        return next(error);
    }
    if(!existingUser){
        const error=new HttpError('Wrong Credentials!!',403);
        return next(error);
    }

    //Compare for password
    let validPassword=true;
    try{
        validPassword= await bcrypt.compare(password,existingUser.password);
    }catch(err){
        const error= new HttpError('Something went wrong!!',500);
        return next(error);
    }
    if(!validPassword){
        const error= new HttpError('Wrong Credentials!!',403);
        return next(error);
    }

    res.status(200);
    res.json({
        firstname:existingUser.firstname,
        lastname: existingUser.lastname,
        message: 'You have successfully logged in'
    });
};

//getUser function
const getUser= async(req,res,next)=>{
    const id= req.body;

    try{
        if(id==User.id){
            res.status(200).json({
                firstname: User.firstname,
                lastname:User.lastname
            });
        }
    }catch(err){
        const error= new HttpError('Something went wrong', 403);
        return next(error);
    }
};

//postBlog function
const postBlog= async(req,res,next)=>{
    const{ userID,heading,blogBody}= req.body;
    const createBlog= new blog({
        userID: userID,
        heading:heading,
        blogBody:blogBody
    });
    try{
        await createBlog.save();
    }catch(err){
        const error=new Httperror('Unable to post blog',403);
        return next(error);
    }     
    res.status(200).json({
        message:'Your blog is Posted'
    });
};

//getBlog function
const getBlog= async( req,res,next)=>{

};

exports.userLogin= userLogin;
exports.userSignup=userSignup;
exports.postBlog=postBlog;
exports.getBlog=getBlog;
exports.getUser=getUser;
