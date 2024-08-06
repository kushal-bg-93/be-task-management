const router=require('express').Router()
const {createComment}=require('../../controllers/comment/comment')
const validateBothToken=require('../../middlewares/auth/validateBothMiddleware')

router.post('/create-comment',validateBothToken,createComment)

module.exports=router