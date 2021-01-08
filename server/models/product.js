const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    categoryID: {type: Schema.Types.ObjectId, ref: 'Category'},
    ownerID: {type: Schema.Types.ObjectId, ref: 'Owner'},
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    rating: [Number]   //array of numbers
});

module.exports = mongoose.model("Product",ProductSchema);