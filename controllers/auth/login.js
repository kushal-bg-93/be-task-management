const {findOne}=require('../../models/query/commonQuery')
const {internalError,notFoundError,successResponse}=require('../../utils/response')
const {errorMessages,successMessages}=require('../../utils/messages')
const {decryptData,encryptData}=require('../../utils/common')
const {generateToken,verifyToken}=require('../../utils/generateToken')

const auth={
    login:async (req,res)=>{
        try {
            const {email,password,role}=req?.body
            let collection=(role==='admin')?'Admin':'User'
            let project={
                email:1,
                password:1,
                role:1,
                name:1
            }
            let query={email:email}


            const user=await findOne(collection,query,project)

            if(!user) return notFoundError(req,res,errorMessages?.userDoesntExist)

            const decryptPassword=await decryptData(user?.password)
            
            if(decryptPassword!==password) notFoundError(req,res,errorMessages?.invalidCredentials)

            const token=await generateToken({email:user?.email,role:user?.role,name:user?.name})

            return successResponse(req,res,{message:successMessages?.loginSuccess,token:token,role:user?.role})

        } catch (error) {
            console.log('Error occured in login ',error?.message)
            return internalError(req,res,error?.message)

        }
    }
}
module.exports=auth
