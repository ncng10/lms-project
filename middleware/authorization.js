const jwt = require('jsonwebtoken');
require("dotenv").config();
let secret_key = 'cf534gsgsdg2g' || process.env.JWT_SECRET
module.exports = async (req, res, next) => {
    const jwtToken = req.header("token");
    if (!jwtToken) {
        return res.status(403).json("Not authorized 1");
    }
    try {
        const payload = jwt.verify(jwtToken, secret_key);
        req.user = payload.user
        next();
    } catch (err) {
        console.log(err.message)
        return res.status(403).json("Not authorized 2");
    }
}