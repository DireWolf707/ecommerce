import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    orderItems: [{
        name: {
            type: String,
            required: [true, 'Item name is required']
        },
        qty: {
            type: Number,
            required: [true, 'Item qty. is required']
        },
        image: {
            type: String,
            required: [true, 'Item image is required']
        },
        price: {
            type: Number,
            required: [true, 'Item price is required']
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Item product is required']
        }
    }],
    shippingAddress: {
        address: {
            type: String,
            required: [true, 'Customer address is requireds']
        },
        city: {
            type: String,
            required: [true, 'Customer city is requireds']
        },
        postalCode: {
            type: String,
            required: [true, 'Customer postal code is requireds']
        },
        country: {
            type: String,
            required: [true, 'Customer country is requireds']
        },
    },
    paymentMethod: {
        type: Boolean,
        required: [true, 'Payment method is requireds'],
    },
    paymentResult: {
        id: {
            type: String
        },
        status: {
            type: String
        },
        update_time: {
            type: String
        },
        email_address: {
            type: String
        }
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    delivered: {
        type: Date
    },
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order;