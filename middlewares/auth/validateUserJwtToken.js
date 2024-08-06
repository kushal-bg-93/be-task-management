const { verifyToken } = require("../../utils/generateToken")
const { notFoundError } = require("../../utils/response")
const { successMessages, errorMessages } = require("../../utils/messages")

const {findOne}=require('../../models/query/commonQuery')
const validateToken = async (req, res, next) => {

    if (!req?.headers?.authorization) notFoundError(req, res, errorMessages?.tokenRequired)

    const extractedData = await verifyToken(req?.headers?.authorization)

    if (!extractedData?.status) return notFoundError(req, res, errorMessages?.wentWrong)
    
        const {role,email}=extractedData?.data?.userData

    if(role!=='developer' || role!=='qa') return notFoundError(req,res,errorMessages?.unauthorisedAccess)

    // res.send(extractedData)

    const findUser = await findOne('User',{email:email},{email:1,role:1})


    if (!findUser) return notFoundError(req, res, errorMessages?.userDoesntExist)

    req.userData = {
        _id:findUser?._id,
        email: findUser?.email,
        role: findUser?.role
    }

    next();
}

module.exports = validateToken