import { cartModel } from "../models/cart.model.js"; 

export const addToCart = async (req,res) => {
    const { user, products } = req.body;
    const userId = user;
    const userCart = await cartModel.findOne({ user: userId });

    if (userCart) {
      const existingProductIndex = userCart.products.findIndex(
        (item) => item.product.toString() === products[0].product
      );

      if (existingProductIndex !== -1) {
        userCart.products[existingProductIndex].qty += 1;
      } else {
        userCart.products.push(products[0]);
      }

      await userCart.save();

      res.status(201).json({ message: 'Product added to cart successfully.', cart: userCart });
    } else {
      const newCart = await cartModel.create({
        user: userId,
        products: products
      });

      res.status(201).json({ message: 'Product added to cart successfully.', cart: newCart });
    }
}

export const removeCart = async (req,res) => {
  const { user, products } = req.body;
  const userId = user;
  const userCart = await cartModel.findOne({ user: userId });

  if (userCart) {
    const existingProductIndex = userCart.products.findIndex(
      (item) => item.product.toString() === products[0].product
    );

    if (existingProductIndex !== -1) {
      userCart.products[existingProductIndex].qty -= 1;

      if (userCart.products[existingProductIndex].qty === 0) {
        userCart.products.splice(existingProductIndex, 1);
      }
    } 

    await userCart.save();

    res.status(201).json({ message: 'Product added to cart successfully.', cart: userCart });
  } 
}

export const getCartDetailByUser = async (req,res) => {
    const userId =  req.user._id;
    const cart = await cartModel.findOne({user : userId}).populate('products.product')

    res.status(200).send(cart)
}

export const removeCartAfterOrderCreated = async (req,res) => {
  const userCart = await cartModel.findOne({ user: userId });

        if (userCart) {
            userCart.products = [];
            await userCart.save();
        }
}