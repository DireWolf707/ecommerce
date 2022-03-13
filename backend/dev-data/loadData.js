import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './users.js';
import products from './products.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({
    path: path.join(path.resolve(),'./.env')
})

await connectDB();

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map((p) => {
            return { ...p, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log('Data imported');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

if (process.argv[2] == '-d') {
    destroyData()
} else {
    importData()
}