const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne,pagination, find}=require('../../models/query/commonQuery')
const mongoose = require("mongoose")
const ejs=require('ejs')
const sendMail=require('../../utils/sendEmail')
const socket=require('../../socket')
const comment={
    createComment:async(req,res)=>{
        try {
            const {comment,taskId}=req?.body
            let emails

            // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            // res.header('Access-Control-Allow-Methods', 'GET, POST');
            // res.header('Access-Control-Allow-Headers', 'Content-Type');

            const getTask=await findOne('Task',{_id:new mongoose.Types.ObjectId(taskId)},{assignedTo:1,title:1 })

            if(getTask?.assignedTo?.length){
                const getUserEmails=await find('User',{_id:{$in:getTask?.assignedTo}},{email:1})

                emails=getUserEmails.map(user=>user?.email)
            }

            const insertData={
                comment:comment,
                commentBy:req?.bothUserData?._id,
                email:req?.bothUserData?.email,
                taskId:taskId
            }

            const insertComment=await insertOne('Comment',insertData)

            const content=`${req?.bothUserData?.email} has commented on:${taskId} : ${getTask?.title}`

            const template=await ejs.renderFile('././views/emailCommentTemplate.ejs',{content})

            let emailData=await sendMail(`TaskO : New comment on ${taskId}`,template,emails)

            console.log('this is email data>>',emailData)
            socket.getIo().emit('newComment',insertComment)

            return successResponse(req,res,{message:successMessages?.commentedSuccess,data:insertComment})

            
        } catch (error) {
            console.log(error)
            return internalError(req,res,error?.message)
        }
    },
    viewComments:async(req,res)=>{
        try {
            const {taskId,pageNo}=req?.query
    
            const pageSize=5
    
            const commentData=await pagination('Comment',{taskId:new mongoose.Types.ObjectId(taskId)},{createdAt:-1},pageSize,pageNo)
    
            // console.log(commentData)
    
            if(!commentData.result.length) return notFoundError(req,res,"no comments found")

            return successResponse(req,res,{data:commentData})
            
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
            
        }
    }
}

module.exports=comment