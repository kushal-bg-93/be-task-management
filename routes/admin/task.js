const router=require('express').Router()
const {createTask,viewTask}=require('../../controllers/admin/task')
const validateAdminJwtToken=require('../../middlewares/auth/validateAdminJwtToken')
const fileUpload=require('../../utils/uploadImages')

router.post('/create-task',validateAdminJwtToken,fileUpload.array("attachments",5),createTask)

router.get('/view-tasks',validateAdminJwtToken,viewTask)

module.exports=router