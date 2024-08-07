const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne,find}=require('../../models/query/commonQuery')
const mongoose=require('mongoose')

const subtask={
    createSubtask:async(req,res)=>{
        try {
            let {title,description,parentTaskId,projectId,priority}=req?.body

            // let dateFormat=moment(deadline).endOf("day").format()

        const insertData={
            title:title,
            description:description,
            createdBy:req?.bothUserData?._id,
            assignedTo:[req?.bothUserData?._id],
            subtask:{
                status:true,
                taskId:parentTaskId
            },
            projectId:projectId,
            priority:priority
        }

        const insertSubtask=await insertOne('Task',insertData)

        return successResponse(req,res,{message:successMessages?.taskCreatedSuccess,data:insertSubtask})

        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
        }
    },
    viewSubTasks:async(req,res)=>{
        try {
            const {taskId}=req?.body
            let id=new mongoose.Types.ObjectId(taskId)
            const subTasks=await find('Task',{'subtask.status':true,'subtask.taskId':id})

            if(!subTasks?.length) return successResponse(req,res,"no subtasks found") 

            return successResponse(req,res,{data:subTasks})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
        }
    },
    viewSubtask:async(req,res)=>{
        try {
            const {taskId}=req?.query

            const task=await findOne('Task',{_id:new mongoose.Types.ObjectId(taskId),'subtask.status':true})

            if(!task) return notFoundError(req,res,errorMessages?.notFound)

            return successResponse(req,res,{data:task})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
        }
    }
}

module.exports=subtask