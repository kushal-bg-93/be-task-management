const {notFoundError,successResponse,internalError}=require('../../utils/response')
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne}=require('../../models/query/commonQuery')

const project={
    createProject:async(req,res)=>{
        try {
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
    }
}

module.exports=project