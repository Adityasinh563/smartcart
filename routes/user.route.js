import { Router } from "express";
import { registerController,loginController,logoutController,refreshtoken } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const userRouter = new Router();

userRouter.route('/register').post(registerController)

userRouter.route('/refresh-token').post(verifyJwt,refreshtoken)

userRouter.route('/login').post(loginController)

userRouter.route('/logout').post(verifyJwt,logoutController)

export default userRouter