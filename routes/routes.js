'use strict'

const express = require('express')
const api = express.Router()
const productController = require('../controllers/product')
// const auth = require('../middlewares/auth')
const userController = require('../controllers/user')

/**
 * Products Routes
 */
api.route('/product')
    .get( productController.getAllProducts)
    // .get(auth, productController.getAllProducts)
    .post( auth, productController.createProducts)

// api.route('/product/:productId')
    .get( auth, productController.getProductByID)
    .put( auth, productController.updateProduct)
    .delete( auth, productController.deleteProduct)

/**
 * Session Routes
 */
api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso'})
})

/**
 * User Routes
 */
api.post('/singup', userController.singUp)
api.route('/singup')
    .post(userController.singUp)
api.route('/singin')
    .post(userController.singIn)
api.route('/updatepassword')
    .post(userController.changePassword)
api.route('/forgotpassword')
    .post(userController.forgotPassword)

module.exports = api