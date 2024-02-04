import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
        name : {
            type: String,
            required: true
        },
        description : {
            type: String,
            required: true
        },
        category : {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true
        },
        price : {
            type: Number,
            required: true
        },
        stockQuantity : {
            type : Number,
            required: true
        }
    },
        {
            timestamps: true
        }
    )

export const productModel = new mongoose.model('products',productSchema) 