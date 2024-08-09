const router=require('express').Router()
const validateAdminJwtToken=require('../../middlewares/auth/validateAdminJwtToken')
const {createProject,viewProject}=require('../../controllers/admin/project')

router.post('/create-project',validateAdminJwtToken,createProject)
router.get('/view-project',validateAdminJwtToken,viewProject)

module.exports=router;