const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enums:["developer","qa"],
        required:true
    },
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin',
        required:true
    },
    projectId:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    }
    ],
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("user",userSchema)