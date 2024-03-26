import mongoose, { Schema,Model } from "mongoose";

const productSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "products"
    },
    qty: {
        type: Number,
        default: 1
    }
});

const cartSchema = new Schema({
    user: {
        type : mongoose.Types.ObjectId,
        ref : "users"
    },
    products : [productSchema]
})

cartSchema.statics.clearUserCart = async function (userId) {
    const userCart = await this.findOne({ user: userId });

    if (userCart) {
        userCart.products = [];
        await userCart.save();
    }
};

export const cartModel = new mongoose.model("carts",cartSchema)