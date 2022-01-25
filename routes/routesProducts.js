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
    .post( productController.createProducts)

module.exports = api