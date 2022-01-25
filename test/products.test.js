const supertest = require('supertest')
const app = require('./app')

const api = supertest(app)

test('products are returned as json', () => {
    api.route('/product')
        .get( productController.getAllProducts)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})