const {login}=require("../../controllers/auth/login")
const router=require('express').Router()
const {loginValidation}=require('../../middlewares/validations/auth')

router.post('/login',loginValidation,login)

module.exports=router