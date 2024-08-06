const { required } = require('joi')
const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"task",
        required:true
    },
    mentions:[
        {type:String}
    ]
},{timestamps:true})

module.exports=mongoose.model("comment",commentSchema)