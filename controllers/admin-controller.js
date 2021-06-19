const mongoose= require('mongoose');
const admin= require('../models/admin-model');
const bcrypt = require('bcryptjs');
const HttpError= require('../utils/Httperror');

//SIGNUP function
const adminSignup= async (req,res,next)=>{
    
    const{firstname,lastname,email,password,role}=req.body;
    
    //Checking for duplicate Emails
    let existingAdmin=null;
    try{
        existingAdmin= admin.findOne({
            email:email
        });
    }catch(err){
        const error= new HttpError('OOPS! Some error occured. Please try later',420);
        return next(error);
    }
    if(existingAdmin){
        const error= new HttpError('Email already in use, please try with another Email',500);
        return next(error);
    }

    //Encrypted password
    let hashedPassword=null;
    try{
        hashedPassword= await bcrypt.hash(password,12);
    }catch(err){
        const error= new HttpError('OOPS! something went wrong. Please try later');
        return next(error);
    }

    //Creating a Admin
    const createAdmin= new admin(
        {
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hashedPassword,
            role:'Admin'
        }
    );

    //Entries in Database
    try{
        await createAdmin.save();
    }catch(err){
        const error=new HttpError('Signup Failed Try Later',500);
        return next(error);
    }   
};

//LOGIN Function
const adminLogin=async (req,res,next)=>{

    const {email,password}=req.body;
    //Check for email is correct or not
    let existingAdmin=null;
    try{
        existingAdmin= admin.findOne({
            email:email
        });
    }catch(err){
        const error=new HttpError('Login Failed',420);
        return next(error);
    }
    if(!existingAdmin){
        const error=new HttpError('Wrong Credentials, please try again',420);
        return next(error);
    }

    //Check for Password
    let validPassword=true;
    try{
        validPassword=await bcrypt.compare(password,existingAdmin.password);
    }catch(err){
        const error=new HttpError('Some error occured',500);
        return next(error);
    }
    if(!validPassword){
        const error=new HttpError('Wrong Credentials, please try again',420);
        return next(error);
    }

    //Send response if everything is true
    res.status(200);
    res.json({
        firstname: existingAdmin.firstname,
        lastname: existingAdmin.lastname
    });
};

exports.adminLogin= adminLogin;
exports.adminSignup= adminSignup;