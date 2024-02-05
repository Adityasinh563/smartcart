import { Router } from "express";
import { createOrderController, getAllOrdersController, getOrderByUserId } from "../controllers/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const  orderRouter = new Router();

orderRouter.route('/createOrder').post(verifyJwt,createOrderController);

orderRouter.route('/').get(verifyJwt,getAllOrdersController)

orderRouter.route('/getorder').get(verifyJwt,getOrderByUserId)

export default orderRouter
