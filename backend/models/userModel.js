import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.checkPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})


const User = mongoose.model('User', userSchema)

export default User;