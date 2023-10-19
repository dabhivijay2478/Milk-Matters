const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../CattleFeed/Product');

const inventorySchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    packing: { type: Number }, 
    status: { type: String },
    availableStock: { type: Number, default: 0 },
    sellStock: { type: Number, default: 0 },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
