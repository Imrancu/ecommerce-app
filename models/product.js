const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
    title: {type: String, required: true},
    price:{type: Number, required: true},
    description: String,
});

export const Product = models.Product || model('Product', ProductSchema);