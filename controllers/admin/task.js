const {notFoundError,successResponse,internalError}=require('../../utils/response')
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne}=require('../../models/query/commonQuery')
const moment=require('moment')

const task={
    createTask:async(req,res)=>{

        try {
            let {title,description,assignedTo,subtask,projectId,priority,deadline}=req?.body

            let dateFormat=moment(deadline).endOf("day").format()

        const insertData={
            title:title,
            description:description,
            createdBy:req?.adminData?._id,
            assignedTo:assignedTo,
            subtask:subtask,
            projectId:projectId,
            priority:priority,
            deadline:dateFormat
        }

        const insertTask=await insertOne('Task',insertData)

        return successResponse(req,res,{message:successMessages?.taskCreatedSuccess,data:insertTask})
            
        } catch (error) {
            console.log(error)
            return internalError(req,res,error?.message)
        }
        
    }
}

module.exports=task