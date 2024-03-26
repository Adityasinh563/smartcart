import { Router } from "express";
import { createOrderController, getAllOrdersController, getOrderByUserId, getOrderByOrderId, editOrderController } from "../controllers/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const  orderRouter = new Router();

orderRouter.route('/createOrder').post(verifyJwt,createOrderController);

orderRouter.route('/getorder').get(verifyJwt,getOrderByUserId)

orderRouter.route('/getOrderByOrderId').get(verifyJwt,getOrderByOrderId)

orderRouter.route('/updateOrder').put(verifyJwt,editOrderController)

export default orderRouter
