const { verifyToken } = require("../../utils/generateToken")
const { notFoundError } = require("../../utils/response")
const { successMessages, errorMessages } = require("../../utils/messages")

const {findOne}=require('../../models/query/commonQuery')
const validateToken = async (req, res, next) => {

    let project,query,collection

    if (!req?.headers?.authorization) notFoundError(req, res, errorMessages?.tokenRequired)

    const extractedData = await verifyToken(req?.headers?.authorization)

    if (!extractedData?.status) return notFoundError(req, res, errorMessages?.wentWrong)
    
        const {role,email}=extractedData?.data?.userData

    // if(role!=='admin') return notFoundError(req,res,errorMessages?.unauthorisedAccess)
    if(role==='admin'){
        collection='Admin'
        project={email:1,role:1}
        query={email:email}
    }else{
        collection='User'
        project={email:1,role:1,projectId:1}
        query={email:email}
    }

    // res.send(extractedData)

    const findUser = await findOne(collection,query,project)


    if (!findUser) return notFoundError(req, res, errorMessages?.userDoesntExist)

    // if(role=='admin'){

    //     req.adminData = {
    //         _id:findUser?._id,
    //         email: findUser?.email,
    //         role: findUser?.role
    //     }
    // }else{
    //     req.userData = {
    //         _id:findUser?._id,
    //         email: findUser?.email,
    //         role: findUser?.role
    //     }
    // }

    req.bothUserData = {
        _id:findUser?._id,
        email: findUser?.email,
        role: findUser?.role,
        projectId:findUser?.projectId??[]
    }


    next();
}

module.exports = validateToken