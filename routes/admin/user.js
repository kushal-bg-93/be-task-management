const router=require('express').Router()
const {createUser,getUsers,searchUser}=require('../../controllers/admin/user')
const validateAdminJwtToken=require('../../middlewares/auth/validateAdminJwtToken')
const validateBothJwtToken=require('../../middlewares/auth/validateBothMiddleware')

router.post('/create-user',validateAdminJwtToken,createUser)
router.get('/get-users',validateAdminJwtToken,getUsers)
router.get('/search-user',validateBothJwtToken,searchUser)

module.exports=router;