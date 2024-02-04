import { productModel } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js"; 

export const addProductController = async (req,res) => {
    try{
    const { name,description,category,price,stockQuantity } = req.body;

    if(
        [name,description,category,price,stockQuantity].some((item) => String(item).trim() == "")
    ){
        res.status(400).json({ error : "all fields are required" })
        return
    }

    const imageLocalpath = req.files.productImage[0].path
    const image = await uploadOnCloudinary(imageLocalpath)

    const addedProduct = await productModel.create({
        name : name,
        description : description,
        category : category,
        price : price,
        stockQuantity : stockQuantity,
        productImage : image.secure_url
    })

    res.status(200).json({
        addedProduct
    })
    }
    catch(e){
        console.log(e)
    }

}

export const getAllProduct = async (req,res) => {
    const products = await productModel.find()
    res.status(200).send(products)
}