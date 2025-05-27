const express = require("express")
const validToken =require('../Middleware/ValidateToken')

const router = express.Router()
const {
    googleLogin,
    LoginUser ,
    RegisterUser,
    CurrentUser} = require('../Controllers/UserControl')

router.post("/register",RegisterUser ).post("/login",LoginUser).post("/auth/google" , googleLogin)

router.get("/current" ,validToken,  CurrentUser)

module.exports = router;