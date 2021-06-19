const mongoose= require('mongoose');
const mongooseValidator= require('mongoose-unique-validator');
const Schema=  mongoose.Schema;
const blog= new Schema({
    userID:{type:String, required:true},
    heading:{type:String, required:true},
    blogBody:{type:String}
});

blog.plugin(mongooseValidator);
module.exports =mongoose.model('Blog',blog);