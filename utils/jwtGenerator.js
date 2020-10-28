const jwt = require("jsonwebtoken");
require("dotenv").config();
let secret_key = 'cf534gsgsdg2g' || process.env.JWT_SECRET
function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, secret_key, { expiresIn: "2h" });
}

module.exports = jwtGenerator;