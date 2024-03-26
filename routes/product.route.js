import { Router } from "express";
import { getAllProduct,getProductById } from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"; 
import { upload } from "../middlewares/multer.middleware.js"; 

const productRouter = new Router()

productRouter.route('/').get(verifyJwt,getAllProduct)

productRouter.route('/:id').get(verifyJwt,getProductById)

export default productRouter