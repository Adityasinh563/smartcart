import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type : String
    },
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
    payMethod : {
        type : String,
        enum : ['cash','online'],
        required : true
    },
    totalPrice: {
        type: Number
    },
    totalQuantity:{
        type: Number
    },
    deliveryPartner: {
        type: mongoose.Types.ObjectId,
        ref:'deliverypartners',
        default: null
    },
    status:{
        type: String,
        enum: ['placed','dispatched','delivered'],
        default: 'placed'
    }
},
    {
        timestamps: true
    }
)

orderSchema.statics.generateOrderId = () => {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 5);
    return timestamp + randomString;
}

export const orderModel = new mongoose.model('orders', orderSchema) 