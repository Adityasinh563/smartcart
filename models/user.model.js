import mongoose ,{ Schema,model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addressSchema = new Schema({
        street1 : {
            type : String,
        },
        street2 : {
            type : String,
        },
        street3 : {
            type : String,
        },
        city : {
            type : String,
        },
        state : {
            type: String
        },
        zip : {
            type : String
        },
        country : {
            type : String
        }
})

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
        },
        address : {
            type : addressSchema,
            default : {}
        },
        isAdmin : {
            type : Boolean,
            default : false
        },
        isDeliveryPartner:{
            type: Boolean,
            default: false
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
        expiresIn : '1h'
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
        expiresIn : '1h'
    }
    )
}

export const user = new model('users',userSchema)