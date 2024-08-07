const router=require('express').Router()
const validateBothJwtToken=require('../../middlewares/auth/validateBothMiddleware')
const {viewTasks}=require('../../controllers/task/task')

router.post('/view-tasks',validateBothJwtToken,viewTasks)

module.exports=router