import { Router } from "express"; 
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getAllOrdersController } from "../controllers/order.controller.js"; 
import { addProductController } from "../controllers/product.controller.js"; 
import { getUsers } from "../controllers/user.controller.js"; 
import { upload } from "../middlewares/multer.middleware.js"; 

const adminRouter = new Router()

adminRouter.use(verifyJwt)

adminRouter.use(async (req,res,next) => {
    if(req.user.isAdmin){
        next()
    }
    else{
        res.status(401).json({"error" : "You are Not Authorised"})
    }
})

adminRouter.route('/orders').get(getAllOrdersController)

adminRouter.route('/addProduct').post(upload.fields([{ name : "productImage", maxCount : 2 }]),addProductController)

adminRouter.route('/users').get(getUsers)

export default adminRouter

