const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asynchandler(async (req, res, next) => {
    let token;
    let authHandler = req.headers.Authorization || req.headers.authorization;

    if(authHandler && authHandler.startsWith("Bearer")){
       token = authHandler.split(" ")[1];
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err){
            res.status(404);
            throw new Error("User is not authorized");
        }
        req.user = decode.user;
        next();
       });
       if(!token){
        res.status(401);
        throw new Error("No token provided");
       }
    }
});

module.exports = validateToken;
