const router=require('express').Router()
const {createTask}=require('../../controllers/admin/task')
const validateAdminJwtToken=require('../../middlewares/auth/validateAdminJwtToken')

router.post('/create-task',validateAdminJwtToken,createTask)

module.exports=router