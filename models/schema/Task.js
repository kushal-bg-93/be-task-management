const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin',
        required:true
    },
    assignedTo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    subtask:{
        status:{
            type:Boolean,
            default:false
        },
        taskId:{
            type:mongoose.Schema.Types.ObjectId
        }
    },
    status:{
        type:String,
        default:"open",
        enum:["open","on progress","done","close"]
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    attachments:[
        {type:String}
    ],
    priority:{
        type:String,
        default:"normal",
        enum:["normal","moderate","critical"]
    },
    deadline:{
        type:Date
    }

},{
    timestamps:true
})

module.exports=mongoose.model("task",taskSchema)