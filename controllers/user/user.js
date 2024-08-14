const { search } = require("../../models/query/commonQuery")
const { successResponse, internalError } = require("../../utils/response")
const mongoose=require('mongoose')

const user = {
    searchUser:async(req,res)=>{
        try {
            const searchTerm=req?.query?.search

            const searchResult=await search('User','name',searchTerm,{role:1,email:1},{projectId:new mongoose.Types.ObjectId(req?.query?.projectId)})

            if(!searchResult.length) return successResponse(req,res,{data:[]})

            return successResponse(req,res,{data:searchResult})
        } catch (error) {
            console.log(error)
            return internalError(req,res,error.message)
            
        }
    }
}

module.exports=user