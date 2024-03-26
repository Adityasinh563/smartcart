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

productSchema.statics.decrementQty = async function(productId,qty){
    const product = await this.findById(productId)

    if(product.stockQuantity != 0){
        product.stockQuantity = product.stockQuantity - qty;
    }
    if(product.stockQuantity === 1){
        product.stockQuantity = 0;
    }
    await product.save()
}

export const productModel = new mongoose.model('products',productSchema) 