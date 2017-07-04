/**
 * Created by yangxz-nash on 17/6/9.
 */
var mongoose = require("mongoose");
var ChapterModel = mongoose.model("chapter",new mongoose.Schema({
    title:String,
    content:String,
    courseid:String,
    uid:String
},{_id:true}));
module.exports = ChapterModel;