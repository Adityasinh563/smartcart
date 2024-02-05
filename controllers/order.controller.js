import { orderModel } from "../models/order.model.js";

export const createOrderController = async (req,res) => {
    const { customer,products,totalPrice } = req.body;

    const order = await orderModel.create({
        customer : customer,
        products : products,
        totalPrice : totalPrice
    })

    res.status(200).json({order})
}

export const getAllOrdersController = async (req,res) => {
    const orders = await orderModel.find().populate({path : "customer products.product", select : "-password -refreshtoken -createdAt -updatedAt -__v"}).select("-passsword")
    res.status(200).json({"orders" : orders})
}

export const getOrderByUserId = async (req,res) => {
    const orders = await orderModel.find({customer : req.user._id})
    res.status(200).json({"orders" : orders})
}
