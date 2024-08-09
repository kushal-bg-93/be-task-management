const {notFoundError,successResponse,internalError}=require('../../utils/response')
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne, find}=require('../../models/query/commonQuery')
const mongoose = require('mongoose')

const project={
    createProject:async(req,res)=>{
        try {
            console.log('token',req?.headers?.authorization)
            const {name}=req?.body
            const insertData={
                name:name,
                projectOwner:req?.adminData?._id
            }

            const insertProject=await insertOne('Project',insertData)

            return successResponse(req,res,{message:successMessages?.projectCreatedSuccess,data:insertProject})
            
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
        }
    },
    viewProject:async(req,res)=>{
        try {
            const project=await find('Project',{projectOwner:new mongoose.Types.ObjectId(req?.adminData?._id)})

            if(!project.length) return successResponse(req,res,{mesage:errorMessages?.notFound})
            
            return successResponse(req,res,{data:project})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
        }
    }
}

module.exports=project