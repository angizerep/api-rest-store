'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const productController = require('./controllers/product')

app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.get('/api/product', productController.getAllProducts)
app.get('/api/product/:productId', productController.getProductByID)
app.post('/api/product', productController.createProducts)
app.put('/api/product/:productId', productController.updateProduct)
app.delete('/api/product/:productId', productController.deleteProduct)

module.exports = app