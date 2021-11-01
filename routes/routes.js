'use strict'

const express = require('express')
const api = express.Router()
const productController = require('../controllers/product')

api.get('/product', productController.getAllProducts)
api.get('/product/:productId', productController.getProductByID)
api.post('/product', productController.createProducts)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId', productController.deleteProduct)

module.exports = api