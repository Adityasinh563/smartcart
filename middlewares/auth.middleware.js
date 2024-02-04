import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js";

export const verifyJwt = async (req,res,next) => {
    try {
        const token = req.cookies?.accesstoken

        if(!token){
            res.status(400).json({
                error : "Token is required"
            })
        }

        const decodedToken = await jwt.verify(token,process.env.ACCESS_SECRET_KEY)

        const fetchUser = await user.findById(decodedToken?._id).select("-password -refreshtoken")

        if(!fetchUser){
            res.status(401).json({error : "Invalid User"})
            return
        }

        req.user = fetchUser
        next()
    }
    catch(e){
        console.log(e)
    }
}