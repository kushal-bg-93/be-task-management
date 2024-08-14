const {notFoundError,successResponse,internalError}=require('../../utils/response')
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne,find, pagination,pushOne}=require('../../models/query/commonQuery')
const moment=require('moment')
const mongoose = require('mongoose')

const task={
    createTask:async(req,res)=>{

        try {
            // console.log('this is req.body',req.body.title)
            // res.json(req.body)
            let {title,description,assignedTo,subtask,projectId,priority,deadline}=req?.body

            console.log('data are =>',req.body)
            // let assignedToDecoded=decodeURIComponent(assignedTo).split(',')
            let assignedToArr=assignedTo.split(",")


            let subtaskParsed=decodeURIComponent(subtask)

            let dateFormat=moment(deadline).endOf("day").format()

            const files=req.files
            console.log('These are files>>',files)
        let insertData={
            title:title,
            description:description,
            createdBy:req?.adminData?._id,
            assignedTo:assignedToArr,
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
        
    },
    viewTask:async(req,res)=>{
        try {
            const {pageNo}=req?.query

            let pageSize=10

            const paginatedData=await pagination('Task',{createdBy:new mongoose.Types.ObjectId(req?.adminData?._id)},{createdAt:-1},pageSize,pageNo,{title:1,assignedTo:1,status:1,priority:1,deadline:1})
            
            // const task=await find('Task',{createdBy:new mongoose.Types.ObjectId(req?.adminData?._id)})

            if(!paginatedData)
                return successResponse(req,res,errorMessages.notFound)

            return successResponse(req,res,{data:paginatedData})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
            
        }
    },
    assignTask:async(req,res)=>{
        try {
            const {taskId,userId}=req?.body

            const updateData=await pushOne('Task',{_id:new mongoose.Types.ObjectId(taskId)},{assignedTo:new mongoose.Types.ObjectId(userId)})

            if(updateData?.acknowledged && updateData?.modifiedCount==1){
                return successResponse(req,res,successMessages?.success)
            }

            
        } catch (error) {
            console.log(error)
            return internalError(req,res,error?.message)
            
        }
    }
}

module.exports=task