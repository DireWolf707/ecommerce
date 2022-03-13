import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required']
    }
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required'],
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: [true, 'Password is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        default: 0
    },
    numReviews: {
        type: Number,
        required: [true, 'Number of reviews is required'],
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    countInStock: {
        type: Number,
        required: [true, 'Count of stock is required'],
        default: 0
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product;