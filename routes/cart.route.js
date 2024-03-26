import { addToCart,getCartDetailByUser,removeCart } from "../controllers/cart.controller.js"; 
import { verifyJwt } from "../middlewares/auth.middleware.js"; 
import { Router } from "express"; 

const cartRouter = Router()

cartRouter.route("/addToCart").post(verifyJwt,addToCart)
cartRouter.route("/getCart").get(verifyJwt,getCartDetailByUser)
cartRouter.route("/removeCart").post(verifyJwt,removeCart)

export default cartRouter
