const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne,pagination,find}=require('../../models/query/commonQuery')
const mongoose = require("mongoose")

const project={
    viewProject:async(req,res)=>{
        try {
            const projects=await find('Project',{$or:[{_id:{$in:req?.bothUserData?.projectId}},{projectOwner:new mongoose.Types.ObjectId(req?.bothUserData?._id)}]})

            if(!projects.length) {return notFoundError(req,res,errorMessages.notFound)}

                return successResponse(req,res,{data:projects})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
        }
    }
}

module.exports=project