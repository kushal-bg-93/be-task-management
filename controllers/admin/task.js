const {notFoundError,successResponse,internalError}=require('../../utils/response')
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne}=require('../../models/query/commonQuery')
const moment=require('moment')

const task={
    createTask:async(req,res)=>{

        try {
            // console.log('this is req.body',req.body.title)
            // res.json(req.body)
            let {title,description,assignedTo,subtask,projectId,priority,deadline}=req?.body

            let assignedToDecoded=decodeURIComponent(assignedTo).split(',')

            let subtaskParsed=JSON.parse(subtask)

            let dateFormat=moment(deadline).endOf("day").format()

            const files=req.files
            console.log('These are files>>',files)
        let insertData={
            title:title,
            description:description,
            createdBy:req?.adminData?._id,
            assignedTo:assignedToDecoded,
            subtask:subtaskParsed,
            projectId:projectId,
            priority:priority,
            deadline:dateFormat
        }

        if(files.length){
            insertData['attachments']=files.map(item=>item.filename)
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