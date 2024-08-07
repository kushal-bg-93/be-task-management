const router=require('express').Router()
const {createTask}=require('../../controllers/admin/task')
const validateAdminJwtToken=require('../../middlewares/auth/validateAdminJwtToken')
const fileUpload=require('../../utils/uploadImages')

router.post('/create-task',validateAdminJwtToken,fileUpload.array("attachments",5),createTask)

module.exports=router