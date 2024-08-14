const router=require('express').Router();
const {searchUser}=require('../../controllers/user/user')
const validateBothJwtToken=require('../../middlewares/auth/validateBothMiddleware')

router.get('/searchUser',validateBothJwtToken,searchUser)

module.exports=router;