const router=require('express').Router()
const {createUser}=require('../../controllers/admin/user')
const validateAdminJwtToken=require('../../middlewares/auth/validateAdminJwtToken')

router.post('/create-user',validateAdminJwtToken,createUser)

module.exports=router;