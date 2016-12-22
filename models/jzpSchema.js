var mongoose=require("mongoose");
var mod={};
var jzpSchema=new mongoose.Schema({
    name:String,
    age:Number,
    sex:String,
    ageStage:String
})
mod.jzp=mongoose.model("jzp",jzpSchema)
module.exports = mod