/**
 * Created by yangxz-nash on 17/6/9.
 */
var mongoose = require("mongoose");
var Course = mongoose.model("course",new mongoose.Schema({
    title:String,
    type:Number,
    logo:String,
    brief:String,
    uid:String,
    uname:String,
    status:String,
    pubtime:String
},{_id:true}));
module.exports = Course;