import { deliveryPartnerModel } from "../models/deliveryPartner.model.js";

export const addDeliveryPartnerController = async (req,res) => {
    const { name,username,password } = req.body;
    const deliveryPartner = await deliveryPartnerModel.create({
        name: name,
        username: username,
        password: password
    })

    res.status(201).json(deliveryPartner)
}

export const getDeliveryPartners = async (req,res) => {
    const deliveryPartners = await deliveryPartnerModel.find().populate({path : "orders",
        populate: {
            path: 'products.product', // Assuming 'products' is the array of products in each order
            model: 'productModel' // Replace 'Product' with the name of your product model
        },
        populate: {
            path: 'customer',
            model: 'users'
        }
    }).exec()

    res.status(200).json(deliveryPartners)
}

export const assignOrderToDeliveryPartnerController = async (req,res) => {
    const { deliveryPartnerId,orderIds } = req.body 

    const deliveryPartner = await deliveryPartnerModel.findById(deliveryPartnerId).exec()

    if(!deliveryPartner){
        res.status(500).json("deliveryPartner doesn't exist")
    }

    for (const orderId of orderIds){
        deliveryPartner.orders.push(orderId)
    }

    await deliveryPartner.save()

    res.status(201).json(deliveryPartner)
}