const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    try {
        //req.user has payload
        const user = await pool.query("SELECT * FROM users WHERE user_role = 'Admin'");
        res.json(user.rows[0]);
        if (user.rows === 0) {
            console.log('unauth')
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;