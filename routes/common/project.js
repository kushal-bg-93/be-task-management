const router=require('express').Router()
const validateBothJwtToken=require('../../middlewares/auth/validateBothMiddleware')
const {viewProject}=require('../../controllers/project/project')

router.get('/view-projects',validateBothJwtToken,viewProject)

module.exports=router