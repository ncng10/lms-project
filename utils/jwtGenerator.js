const jwt = require("jsonwebtoken");
require("dotenv").config();
let secret_key = process.env.JWT_SECRET || 'ncccc'
function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.secret_key, { expiresIn: "2h" });
}

module.exports = jwtGenerator;