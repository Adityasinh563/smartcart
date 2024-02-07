import { user } from "../models/user.model.js";
import mongoose from "mongoose";



const generateAccessRefreshToken = async function (userId) {
    try{
        const User = await user.findById(userId)

        const accesstoken = User.generateAccessToken()
        const refreshtoken = User.generateRefreshToken()

        User.refreshtoken = refreshtoken
        await User.save({ validateBeforeSave: false })

        return { accesstoken,refreshtoken }
    }
    catch(e){
        throw new Error("Error While Generating token",e)
    }
}

export const registerController = async (req,res) => {
    const { username , password } = req.body

    if(
        [username,password].some((item) => item.trim() == "")
    )
    {
        res.status(400).json('All fields are required')
        return
    }

    const isUserExist = await user.findOne({ username : username})

    if(isUserExist){
        res.status(409).json({ error : 'User Already Exist' })
        return
    }

    const User = await user.create({
        username : username,
        password : password
    })

    const createdUser = await user.findById(User._id).select("-password -_id")

    if(!createdUser){
        res.status(500).json('Something Went Wrong While Creating User')
        return
    }

    return res.status(201).json({user : createdUser,message : 'User registerd successfully'})
}

export const loginController = async (req,res) => {
    const { username,password } = req.body

    if(
        [username,password].some((item) => item.trim() == "")
    )
    {
        res.status(400).json({error : "all fields are required"})
        return
    }

    const fetchedUser = await user.findOne({username : username})

    if(fetchedUser){
        const isPasswordCorrect = await fetchedUser.isPasswordCorrect(password)
        if(fetchedUser.username == username && isPasswordCorrect){
            
            const { accesstoken,refreshtoken } = await generateAccessRefreshToken(fetchedUser._id)
            const foundUser = await user.findById({_id : fetchedUser._id}).select("-password")

            const options = { httpOnly : true,secure : true }

            res.cookie("accesstoken",accesstoken,options)
            .cookie("refreshtoken",refreshtoken,options)
            .status(200).json({user: foundUser,message : "Logged in successfully"})
        }
        else{
            res.status(400).json({error : "Incorrect Password"})
        }
    }
    else{
        res.status(400).json({error : "user not found"})
    }
} 

    export const refreshtoken = async (req,res) => {

        const options = { httpOnly : true, secure : true }

        res.clearCookie("accesstoken",options).clearCookie("refreshtoken",options)

        const loggedInUser = await user.findById(req.user._id)

        const refreshToken = loggedInUser.refreshtoken

        const newrefreshToken = await loggedInUser.generateRefreshToken()

        loggedInUser.refreshtoken = newrefreshToken
        await loggedInUser.save({ validateBeforeSave: false })

        res.status(200).cookie("accesstoken",refreshToken,options).cookie("refreshtoken",newrefreshToken,options).json({"newrefreshToken" : newrefreshToken,"accesstoken" : refreshToken})
    }

export const logoutController = async (req,res) => {
    await user.findByIdAndUpdate(req.user._id,{
        $unset : {
            refreshtoken : 1
        }
    },{
        new : true
    }
    )
    const options = { httpOnly : true, secure : true }
    res.status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json({message : "Logged out successfully"})
}

