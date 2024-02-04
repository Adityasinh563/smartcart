import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'products'
        },
        qty: {
            type: Number,
        }
    }],
    totalPrice: {
        type: Number
    }
},
    {
        timestamps: true
    }
)

export const orderModel = new mongoose.model('orders', orderSchema) 