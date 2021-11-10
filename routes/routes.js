'use strict'

const express = require('express')
const api = express.Router()
const productController = require('../controllers/product')
const auth = require('../middlewares/auth')
const userController = require('../controllers/user')

api.get('/product', productController.getAllProducts)
api.get('/product/:productId', productController.getProductByID)
api.post('/product', productController.createProducts)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId', productController.deleteProduct)
api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso'})
})
api.post('/singup', userController.singUp)
api.post('/singin', userController.singIn)

module.exports = api