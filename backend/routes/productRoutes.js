import express from 'express';
import Product from '../models/productModel.js';
 
const router = express.Router();

router.get("/", async (req,res,next) => {
    const products = await Product.find()

    res.json({
        data: products
    })
})

router.get("/:id", async (req,res,next) => {
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


export default router;