const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne}=require('../../models/query/commonQuery')
const {encryptData}=require('../../utils/common')

const user={

    createUser:async(req,res)=>{
        try {
            // res.json(req?.adminData)
            const {name,role,projectId,email,password}=req?.body

            const checkUser=await findOne('User',{email:email},{email:1})

            if(checkUser?.email) return notFoundError(req,res,errorMessages?.userExists)

            const encryptPassword=await encryptData(password)

            const insertData={
                name:name,
                role:role,
                managerId:req?.adminData?._id,
                projectId:projectId,
                email:email,
                password:encryptPassword
            }
        
            const insertUser=await insertOne('User',insertData)

            return successResponse(req,res,{message:successMessages?.userCreated,data:insertUser})

        } catch (error) {
            console.log(error)
            return internalError(req,res,{message:error?.message})
        }
    }
}

module.exports=user