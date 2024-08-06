const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne}=require('../../models/query/commonQuery')

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

            return successResponse(req,res,{message:successMessages?.commentedSuccess,data:insertComment})
            
        } catch (error) {
            console.log(error)
            return internalError(req,res,error?.message)
        }
    }
}

module.exports=comment