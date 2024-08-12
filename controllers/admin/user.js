const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne,find,search}=require('../../models/query/commonQuery')
const {encryptData}=require('../../utils/common')
const mongoose = require("mongoose")
const socket=require('../../socket')
const ejs=require('ejs')
const sendEmail=require('../../utils/sendEmail')

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
            
            socket.getIo().emit(`createUser:${req?.adminData?._id}`,{_id:insertUser?._id,name:insertUser?.name,role:insertUser?.role,email:insertUser?.email})

            const content=`Your account has been created by <b>${req?.adminData?.email}</b>. <br/>Your credentials are Email : <a>${email}<a/> <br/> Password : <b>${password}</b>`

            const template=await ejs.renderFile('././views/emailCommentTemplate.ejs',{content})

            let emailData=await sendEmail(`TaskO : Account Creation - ${name}`,template,email)



            return successResponse(req,res,{message:successMessages?.userCreated,data:insertUser})

        } catch (error) {
            console.log(error)
            return internalError(req,res,{message:error?.message})
        }
    },
    getUsers:async(req,res)=>{
        try {
            const users=await find('User',{managerId:new mongoose.Types.ObjectId(req?.adminData?._id)},{name:1,email:1,role:1})
            
            if(!users) return successResponse(req,res,{data:[]})

            return successResponse(req,res,{data:users})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
            
        }
    },
    searchUser:async(req,res)=>{
        try {
            const searchTerm=req?.query?.search
            const searchResult=await search('User','name',searchTerm,{role:1,email:1},{managerId:new mongoose.Types.ObjectId(req?.bothUserData?._id)})

            if(!searchResult.length) return successResponse(req,res,{data:[]})

            return successResponse(req,res,{data:searchResult})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
            
        }
    }
}

module.exports=user