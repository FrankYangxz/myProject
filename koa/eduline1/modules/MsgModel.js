/**
 * Created by yangxz-nash on 17/6/9.
 */
var mongoose = require("mongoose");
var User = mongoose.model("msg",new mongoose.Schema({
    send:String,
    sendname:String,
    message:String,
    sendtime:Date,
    to:String
},{_id:true}));

module.exports = User;