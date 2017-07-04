/**
 * Created by yangxz-nash on 17/6/9.
 */
var mongoose = require("mongoose");
var User = mongoose.model("user",new mongoose.Schema({
    email:String,
    pwd:String,
    nicheng:String,
    role:Number,
    realname:String,
    idnumber:String,
    photoname:String,
    photopath:String,
    preview:String,
    msgnum:Number
},{_id:true}));

module.exports = User;