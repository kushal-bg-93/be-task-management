const router=require('express').Router()
const validateBothJwtToken=require('../../middlewares/auth/validateBothMiddleware')
const {viewTasks,getEmail,updateStatus}=require('../../controllers/task/task')

router.post('/view-tasks',validateBothJwtToken,viewTasks)
router.post('/getEmail',validateBothJwtToken,getEmail)
router.post('/updateStatus',validateBothJwtToken,updateStatus)

module.exports=router