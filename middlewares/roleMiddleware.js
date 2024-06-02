const express = require('express');

const roleMiddleware = (requiredRole) => {
    return async (req, resp, next) => {
        try {
            // Assuming your user object has a role property
            if (req.body && req.body.role === requiredRole) {
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

module.exports = roleMiddleware;