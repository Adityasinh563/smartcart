import mongoose, { Schema } from "mongoose";

const deliveryPartnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: 'orders'
    }]
})

export const deliveryPartnerModel = new mongoose.model('deliverypartners',deliveryPartnerSchema)