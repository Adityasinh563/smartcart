import { orderModel } from "../models/order.model.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

export const createOrderController = async (req,res) => {
    const { customer,products,totalPrice,payMethod } = req.body;

    const userCart = await cartModel.findOne({ user: req.user._id });

    if (userCart) {
        userCart.products = [];
        await userCart.save();
    }

    for(let i=0;i < products.length;i++){
        // const produtId = products[i].product
        productModel.decrementQty(products[i].product,products[i].qty)
    }

    const orderId = orderModel.generateOrderId()

    const totalQuantity = products.reduce((acc,item) => {
        acc = acc + item.qty
        return acc
    },0)

    const order = await orderModel.create({
        orderId,
        customer : customer,
        products : products,
        totalPrice : totalPrice,
        payMethod : payMethod,
        totalQuantity: totalQuantity
    })

    res.status(200).json({order})
}

export const getAllOrdersController = async (req,res) => {
    const orders = await orderModel.find().populate({path : "customer", select : "-password -refreshtoken -createdAt -updatedAt -__v"}).populate({path : "products.product"}).populate({path : "deliveryPartner",select: "-orders -__v"})
    res.status(200).json({"orders" : orders})
}

export const getOrderByUserId = async (req,res) => {
    const orders = await orderModel.find({customer : req.user._id}).populate({path: "customer", select: "-password -refreshtoken -createdAt -updatedAt -__v"}).populate({path : "products.product" })
    res.status(200).json({"orders" : orders})
}

export const getOrderByOrderId = async (req,res) => {
    const orderId = req.query.orderId

    const order = await orderModel.find({orderId : orderId}).populate({path: "customer", select: "-password -refreshtoken -createdAt -updatedAt -__v"}).populate({path : "products.product" })

    res.status(200).json(order)
}

export const editOrderController = async (req,res) => {
    const { orderId,deliveryPartner,status } = req.body;
    let updateFields={}

    if (deliveryPartner) {
        updateFields.deliveryPartner = deliveryPartner;
    }

    if (status) {
        updateFields.status = status;
    }

    const order = await orderModel.findByIdAndUpdate(orderId,{
        $set: updateFields
    },{
        new: true
    })

    res.status(201).json(order)
}