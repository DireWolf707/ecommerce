import asyncWrapper from '../utils/asyncWrapper.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export const login = asyncWrapper(async (req,res,next) => {
    const { email, password } = req.body;
    // check email and password are not undefined
    if (!email || !password) {
        throw new Error('please provide both email and password!');
    }
    // check user exist and password
    const user = await User.findOne({ email: email });

    if (!user || !await user.checkPassword(password)) {
        throw new Error('Incorrect email or password!', 401);
    }
    // send jwt token
    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id,
        token
    })
})


export const signup = asyncWrapper(async (req,res,next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const token = signToken(user._id)

    res.status(201).json({
        status: 'success',
        token,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id
    })
})

export const userProfile = (req,res,next) => {
    res.json(req.user)
}

// auth middleware

export const loginRequired = asyncWrapper(async (req,res,next) => {
    // get token
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        token =  token.split(' ')[1]
    } else {
        throw new Error('you are not logged in!');
    }
    // validate token 
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    // check if user exists
    const user = await User.findById(decoded.id).select('-password -__v -updatedAt');
    if (!user) {
        throw new Error('user belonging to the token dont exist anymore! ', 401); 
    }
    // assign user object to request
    req.user = user;

    next();
})



export const authorize = (...roles) => {
    return (req,res,next) => {
        if (!req.user.role.includes(roles)) {
            throw new AppError('access denied',403)
        }   
        next();
    }
}