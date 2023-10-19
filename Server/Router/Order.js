const express = require("express");
const router = express.Router();
const Order = require("../Schema/Order/Order");
const Product = require("../Schema/CattleFeed/Product");
const Inventory = require("../Schema/Inventory/inventory");

// Route to create a new order
router.post("/order-create", async (req, res) => {
    try {
        const {
            dairyCode,
            name,
            contact,
            address,
            productName,
            productQuantity,
        } = req.body;

        if (!dairyCode || !name || !contact || !productName || !productQuantity) {
            return res.status(422).json({ success: false, error: "Please fill in all the required fields" });
        }

        const product = await Product.findOne({ 'attributes.title': productName });

        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        if (product.attributes.availableStock < productQuantity) {
            return res.status(400).json({ success: false, error: "Insufficient stock for the order" });
        }

        const order = new Order({
            dairyCode,
            name,
            contact,
            address,
            product: product._id,
            productQuantity,
        });

        await order.save();

        product.attributes.availableStock -= productQuantity;
        await product.save();

        // Create inventory data for the product
        const inventory = new Inventory({
            product: product._id,
            packing: product.attributes.packing,
            status: product.attributes.status,
            availableStock: product.attributes.availableStock,
        });

        await inventory.save();

        res.status(201).json({ success: true, message: "Order created successfully", order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
});



// Route to get all orders
router.get("/get-orders", async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
});

// Route to get a specific order by ID
router.get("/orders/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId).populate('product');
        if (!order) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
});

// Route to update an existing order
router.put("/orders/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updates = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
});

// Route to delete an order
router.delete("/orders/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
});

module.exports = router;
