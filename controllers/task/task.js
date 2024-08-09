const {notFoundError,internalError,successResponse}=require("../../utils/response")
const {successMessages,errorMessages}=require('../../utils/messages')
const {insertOne,findOne,pagination}=require('../../models/query/commonQuery')
const mongoose = require("mongoose")

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
    }
}

module.exports=task