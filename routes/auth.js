require('dotenv').config();

const bcrypt = require('bcrypt');
const signature = process.env.JWT_SECRET;
const {createAdmin, findAdminByUsername} = require('../db');
const jwt = require('jsonwebtoken');

let hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

const generateToken = (user) => {
    return token = jwt.sign(
        { 
        admin : user.username, 
        superUser : user.superUser
        },
        signature, 
        {  expiresIn: '3d' // expires in 3 days
        });

}

let createAccount = (req, res) => {
    let {username, password} = req.body;
    hashPassword(password)
    .then(hashPassword => {
        createAdmin(username, hashPassword)
    .then(res.send("Account created"));
    
    }) 
}

let verifyUser = async (req,res) => {
    let {username, password} = req.body;
    //change admin function to input username instead of userId
    //console.log(username, password);
    let user = await findAdminByUsername(username)
    if (!user) {
        return res.send(password);
    }
    let isValid = await bcrypt.compare(password, user.password)
    if (isValid){
        let token = generateToken(user)     
        res.send(token);
    } else{
        res.send(password);
    }
}

let verifyToken = async (req, res, next) => {
    let {token} = req.headers;
    let payload; 
    try {
        payload= await jwt.verify(token, signature)
        // console.log('payload',payload);
    } catch (error){
        // console.log(error);
        res.send('unverified user');
    }   
        // *******Need help seeing why payload is undefined here***********
        // console.log('payload',payload);
        // if (payload.superUser == true){
        req.jwt = payload;
        next();
        // } else {
            // res.send('unverified user')
        // }
    }

module.exports = {
    verifyToken, verifyUser, createAccount, generateToken
};