const Joi=require('joi')
const {successResponse,notFoundError}=require("../../utils/response")

const validation={
    loginValidation:async (req,res,next)=>{
        const schema=Joi.object().keys({
            email:Joi.string().email().required(),
            password:Joi.string().required(),
            role:Joi.string().valid('admin','user').required()
        })

        try {
            const {error}=await schema.validate(req?.body)

            if(error){
                return notFoundError(req,res,error?.details[0]?.message)
            }
            return next()
            
        } catch (err) {
            return notFoundError(req,res,err)
        }
    }
}

    


module.exports=validation;