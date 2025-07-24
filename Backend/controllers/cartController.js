
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// Add or update an item in the cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, cartItems: [] });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const existingItem = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity = Math.min(
        existingItem.quantity + quantity,
        product.countInStock
      );
    } else {
      cart.cartItems.push({ product: productId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all cart items for the user
export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'cartItems.product'
    );
    res.json(cart || { cartItems: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update quantity of a specific cart item
export const updateCartItemQuantity = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.cartItems.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    item.quantity = Math.min(quantity, product.countInStock);
    const updatedCart = await cart.save();
    console.log (updatedCart);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Clear the entire cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.cartItems = [];
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

