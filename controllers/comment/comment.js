const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne,pagination}=require('../../models/query/commonQuery')
const mongoose = require("mongoose")
const ejs=require('ejs')
const sendMail=require('../../utils/sendEmail')

const comment={
    createComment:async(req,res)=>{
        try {
            const {comment,taskId,mentions}=req?.body

            const insertData={
                comment:comment,
                commentBy:req?.bothUserData?._id,
                email:req?.bothUserData?.email,
                taskId:taskId,
                mentions:mentions
            }

            const insertComment=await insertOne('Comment',insertData)

            const content=`${req?.bothUserData?.email} has mentioned you on task:${taskId}`

            const template=await ejs.renderFile('././views/emailCommentTemplate.ejs',{content})

            let emailData=await sendMail('Task management : Some one mentioned you',template,mentions)

            console.log('this is email data>>',emailData)

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