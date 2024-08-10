const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne,pagination,find,updateOne}=require('../../models/query/commonQuery')
const mongoose = require("mongoose")
const socket=require('../../socket')

const task={
    viewTasks:async(req,res)=>{
        try {
            const {filterData,pgNo}=req?.body
            let searchQuery={},pagesize=10

            if(filterData?.userId){
                searchQuery={
                    ...searchQuery,
                    assignedTo:new mongoose.Types.ObjectId(filterData?.userId)
                }
            }

            if(filterData?.pending){
                searchQuery={
                    ...searchQuery,
                    status:{
                        $ne:'close'
                    }
                }
            }

            if(filterData?.projectId){
                searchQuery={
                    ...searchQuery,
                    projectId:new mongoose.Types.ObjectId(filterData?.projectId)
                }
            }

            if(filterData?.completed){
                searchQuery={
                    ...searchQuery,
                    status:'close'
                }
            }

            const tasks=await pagination('Task',searchQuery,{createdAt:-1},pagesize,pgNo)

            if(!tasks?.result.length) return successResponse(req,res,errorMessages?.notFound)

            return successResponse(req,res,{data:tasks})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
        }
    },
    getEmail:async(req,res)=>{
        try {
            const {assignedTo,createdBy}=req?.body
            console.log('this is req.body>>>',req.body)
            let collection=assignedTo?'User':'Admin'
        const email=await find(collection,{$or:[{_id:{$in:assignedTo}},{_id:new mongoose.Types.ObjectId(createdBy)}]},{email:1})

        if(!email) return notFoundError(req,res,errorMessages?.notFound)

            console.log('email is',email)

        return successResponse(req,res,{data:email})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
        }
        
    },
    updateStatus:async(req,res)=>{
        try {
            const {status,taskId}=req?.body

            if(status=='close' && req?.bothUserData?.role!=='admin') return notFoundError(req,res,errorMessages?.unauthorisedAccess)

            const task=await findOne('Task',{_id:new mongoose.Types.ObjectId(taskId)},{assignedTo:1})


            if(!task.assignedTo.some(item=>(String(item)==String(req?.bothUserData?._id) || req?.bothUserData?.role=='admin'))) return notFoundError(req,res,errorMessages?.unauthorisedAccess)
            
            const updateStatus=await updateOne('Task',{_id:new mongoose.Types.ObjectId(taskId)},{status:status})

            // console.log(updateStatus)


            if(updateStatus.acknowledged && updateStatus.modifiedCount==1){
                socket.getIo().emit(`changeStatus:${taskId}`,status)

                return successResponse(req,res,updateStatus)
            }

            return notFoundError(req,res,errorMessages.wentWrong)
            

            
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
            
        }
    }
}

module.exports=task