import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminRouter from  "./routes/admin.route.js";
import cors from "cors";
import cartRouter from "./routes/cart.route.js";
import deliveryPartnerRouter from "./routes/deliverypartner.route.js";

dotenv.config({
    path : '.env'
})

const app = express();
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({origin : "http://localhost:4200",credentials : true}))

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB connected successfully")
})
.catch((err) => {
    console.log(err,"Error to connect with db")
})

app.listen(process.env.PORT || 8000,() => {
    console.log(`listening on ${process.env.PORT}`);
})

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)
app.use('/api/admin',adminRouter)
app.use('/api/cart',cartRouter)
app.use('/api/deliverypartner',deliveryPartnerRouter)
