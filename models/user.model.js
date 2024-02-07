import { Schema,model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
        username: {
            type : String,
            required : true,
        },
        password: {
            type : String,
            required : true
        },
        refreshtoken: {
            type : String
        }
    },
    {
        timestamps: true
    })

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
    {
        _id: this._id,
        username: this.username,
        password: this.password
    },
        process.env.ACCESS_SECRET_KEY,
    {
        expiresIn : '60s'
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
    {
        _id: this._id,
        username: this.username,
        password: this.password
    },
        process.env.REFRESH_SECRET_KEY,
    {
        expiresIn : '60s'
    }
    )
}

export const user = new model('users',userSchema)