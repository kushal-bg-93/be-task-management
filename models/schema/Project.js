const { required } = require('joi')
const mongoose=require('mongoose')

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    projectOwner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

module.exports=mongoose.model("project",projectSchema)