'use strict'

const express = require('express')
const api = express.Router()
const productController = require('../controllers/product')
const auth = require('../middlewares/auth')
const userController = require('../controllers/user')

api.get('/product', auth, productController.getAllProducts)
api.get('/product/:productId', auth, productController.getProductByID)
api.post('/product', auth, productController.createProducts)
api.put('/product/:productId', auth, productController.updateProduct)
api.delete('/product/:productId', auth, productController.deleteProduct)
api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso'})
})
api.post('/singup', userController.singUp)
api.post('/singin', userController.singIn)

module.exports = api