const router=require('express').Router()
const validateBothJwtToken=require('../../middlewares/auth/validateBothMiddleware')
const {createSubtask,viewSubTasks,viewSubtask}=require('../../controllers/subtask/subtask')

router.post('/create-subtask',validateBothJwtToken,createSubtask)
router.post('/view-subtasks',validateBothJwtToken,viewSubTasks)
router.get('/view-subtask',validateBothJwtToken,viewSubtask)


module.exports=router