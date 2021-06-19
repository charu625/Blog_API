const mongoose= require('mongoose');
const uniqueValidator= require('mongoose-unique-validator');
const Schema=  mongoose.Schema;
const userModel= new Schema({
        firstname:{type:String, required:true},
        lastname:{type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, required:true, minLength:8},
        dob:{type:String, required:true},
        role:{type:String, required:true}
    }
);
userModel.plugin(uniqueValidator);
module.exports= mongoose.model('User',userModel);