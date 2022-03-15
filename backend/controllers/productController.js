import Product from '../models/productModel.js';
import asyncWrapper from '../utils/asyncWrapper.js';


export const allProducts = asyncWrapper(async (req,res,next) => {
    const products = await Product.find()

    res.json({
        data: products
    })
})

export const getProduct = asyncWrapper(async (req,res,next) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        return res.json({
            data: product
        })
    }

    return res.status(404).json({
        message: 'Product not found'
    })
})