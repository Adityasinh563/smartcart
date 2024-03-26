import { Router } from "express";
import { registerController,loginController,logoutController,refreshtoken,addressController,editUserDetail,getUserById } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const userRouter = new Router();

userRouter.route('/register').post(registerController)

userRouter.route('/refresh-token').post(verifyJwt,refreshtoken)

userRouter.route('/login').post(loginController)

userRouter.route('/logout').post(verifyJwt,logoutController)

userRouter.route('/address').post(verifyJwt,addressController)

userRouter.route('/').get(verifyJwt,getUserById)

userRouter.route('/').put(verifyJwt,editUserDetail)

export default userRouter