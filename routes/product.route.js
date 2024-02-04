import { Router } from "express";
import { addProductController,getAllProduct } from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"; 
import { upload } from "../middlewares/multer.middleware.js"; 

const productRouter = new Router()

productRouter.route('/addproduct').post(upload.fields([{ name : "productImage", maxCount : 2 }]),addProductController)

productRouter.route('/').get(verifyJwt,getAllProduct)

export default productRouter