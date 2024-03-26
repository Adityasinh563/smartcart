import { Router } from "express";
import { addDeliveryPartnerController,assignOrderToDeliveryPartnerController, getDeliveryPartners } from "../controllers/deliverypartner.controller.js";

const deliveryPartnerRouter = new Router();

deliveryPartnerRouter.route('/add').post(addDeliveryPartnerController)

deliveryPartnerRouter.route('/').get(getDeliveryPartners)

deliveryPartnerRouter.route('/assign').post(assignOrderToDeliveryPartnerController)

export default deliveryPartnerRouter;