import asyncWrapper from '../utils/asyncWrapper.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const sendTokenCookieResponse = (user,res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date( Date.now() + 24*60*60*1000 ), // in ms
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production' ,
        sameSite: 'lax'
    }).status(200).json({
        status: 'success',
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id
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
    sendTokenCookieResponse(user,res);
})

export const logout = (req,res,next) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now()), // in ms
        httpOnly: true
    }).status(200).json({
        status: 'success'
    })
}

export const signup = asyncWrapper(async (req,res,next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    // send jwt token
    sendTokenCookieResponse(user,res);
})

export const userProfile = (req,res,next) => {
    const user = req.user;
    res.json({
        status: 'success',
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id
    })
}

export const userUpdate = (req,res,next) => {
    const user = req.user;
    const { email, name } = req.body;

    if (email != '' && name != '' ) {
        user.email = email;
        user.name = name;
    } else {
        throw Error('Invalid details') 
    }

    user.save();

    sendTokenCookieResponse(user, res);
}

export const passwordUpdate = (req,res,next) => {
    const user = req.user;
    const { pass1, pass2 } = req.body;

    if (pass1 != '' && pass1 == pass2) {
        user.password = pass1
    } else {
        throw Error('password dont match')
    }
    
    user.save();

    sendTokenCookieResponse(user, res);
}

// auth middleware

export const loginRequired = asyncWrapper(async (req,res,next) => {
    // get token
    let token = req.cookies.jwt;
    if (!token) {
        throw new Error('you are not logged in!');
    }
    // validate token 
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    // check if user exists
    const user = await User.findById(decoded.id).select('-password -__v -updatedAt');
    if (!user) {
        throw new Error('user belonging to the token dont exist anymore! '); 
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