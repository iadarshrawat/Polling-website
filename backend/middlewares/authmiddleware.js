const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        const decode = await jwt.verify(token.split(" ")[1], process.env.SECRET);

        req.user = decode;
        console.log(req.user);
        next();     
    } catch (error) {
            console.log(error)
    }    
}

module.exports = {isAuth}