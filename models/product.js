'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema ({
    "name": String,
    "picture": String,
    "price": {
        type: Number,
        default: 0
    },
    "description": String,
    "category": {
        type: String,
        enum: ['Computers', 'Phone', 'Accessories']
    },
})

module.exports = mongoose.model('Product', ProductSchema )
