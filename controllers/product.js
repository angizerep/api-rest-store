'use strict'

const Product = require('../models/product')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

function getProductByID ( req, res ){
    let productId = req.params.productId

    Product.findById( productId, (err, product) =>{
        if (err) return res.status(500).send({message: `Error realizar la petición: ${err}`})
        if (!product) return res.status(404).send({message: `El producto no existe`})
        
        res.status(200).send({ product })
    })
}

function getAllProducts ( req, res ){
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `Error realizar la petición: ${err}`})
        if (!products) return res.status(404).send({message: `No existen productos`})

        res.status(200).send({ products })
    })
}

function createProducts ( req, res ){
    let product = new Product()

    product.name = req.body.name,
    product.picture = req.body.picture,
    product.price = req.body.price,
    product.category = req.body.category,
    product.description = req.body.description

    product.save((err, productSaved) => {
        if (err) return res.status(500).send({message: `Error al almacenar en la DB: ${err}`})

        res.status(200).send({ product: productSaved })
    })
}

function updateProduct ( req, res ){
    let productId = req.params.productId
    let productUpdate = req.body;

    Product.findByIdAndUpdate( productId, productUpdate, {new: true}, (err, product) => {
        if (err) return res.status(500).send({message: `Error a buscar editar el producto: ${err}`})

        res.status(200).send({ productUpdate })    
    })
}

function deleteProduct ( req, res ){
    let productId = req.params.productId

    Product.findById( productId, (err, product) => {
        if (err) return res.status(500).send({message: `Error a buscar el producto: ${err}`})
        if (!product) return res.status(404).send({message: `El producto no existe`})
        
        product.remove( err => {
            if (err) return res.status(500).send({message: `Error al eliminar el producto: ${err}`})
            res.status(200).send({ message: 'Producto eliminado' })    
        })
    })
}

module.exports = {
    getProductByID,
    getAllProducts,
    createProducts,
    updateProduct,
    deleteProduct
}