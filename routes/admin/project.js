const router=require('express').Router()
const validateAdminJwtToken=require('../../middlewares/auth/validateAdminJwtToken')
const {createProject}=require('../../controllers/admin/project')

router.post('/create-project',validateAdminJwtToken,createProject)

module.exports=router;