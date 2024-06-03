const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const roleMiddleware = (requiredRole) => {
    return async (req, resp, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            
            req.user = decoded;
            // console.log("req.user",req.user);
            // console.log("decoded",decoded);
            // Assuming your user object has a role property
            if (req.user && req.user.role === requiredRole) {
                next();
            } else {
                resp.status(403).send({ error: 'Access denied.' });
            }
        } catch (error) {
            console.error("Error in roleMiddleware:", error);
            resp.status(500).json({ error: "Internal server error" });
        }
    };
};

module.exports = {roleMiddleware};