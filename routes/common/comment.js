const router=require('express').Router()
const {createComment,viewComments}=require('../../controllers/comment/comment')
const validateBothToken=require('../../middlewares/auth/validateBothMiddleware')

router.post('/create-comment',validateBothToken,createComment)
router.get('/view-comments',validateBothToken,viewComments)

module.exports=router