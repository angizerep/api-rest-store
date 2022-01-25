const supertest = require('supertest')
const express = require('express')
const api1 = require('../routes/routesProducts')
const productController = require('../controllers/product')

const app = express()

const api = supertest(api1)

test('products are returned as json', async() => {
    await api1.route('/product')
        .get( productController.getAllProducts)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

