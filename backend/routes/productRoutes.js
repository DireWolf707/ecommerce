import express from 'express';
import {getProduct,allProducts} from '../controllers/productController.js';
 
const router = express.Router();

router.get("/", allProducts);

router.get("/:id", getProduct);


export default router;