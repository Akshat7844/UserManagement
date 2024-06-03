const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const jwtAuthmiddleware = (req, resp, next) =>{

    const token = req.headers.authorization.split(' ')[1];
    console.log(
        "the value of token is: "+ token
    );
    if(!token) {
        return resp.status(401).json({error: 'unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        resp.status(401).json({err : 'Invalid token'});
    }
}


const generateJwt = (userData) =>{
    return jwt.sign(userData, JWT_SECRET, {expiresIn : '5h'});
}

module.exports  = {jwtAuthmiddleware, generateJwt};