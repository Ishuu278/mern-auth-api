const express = require("express")
const usermodel = require("../config/models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    const isUserAlreadyExists = await usermodel.findOne({email})
    if (isUserAlreadyExists){
        return res.status(400).json({
            message: "user already exist with this email address"
        })
    }
    const user = await usermodel.create({
        name,
        email,
        password
    })

    const token = jwt.sign(
        {
            id:user._id,
            email: user,email
        },
        process.env.JWT_SECRET
    )
    res.cookie("token", token)
    res.status(201).json({
        message: "user registered",
        user,
        token
    })
})
module.exports = authRouter