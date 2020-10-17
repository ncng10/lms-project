const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/admin-authorization', authorization, async (req, res) => {
    try {
        //req.user has payload
        const user = await pool.query("SELECT * FROM users WHERE user_role = 'Admin' and user_id =$1",
            [req.user]);
        res.json(user.rows[0]);
        if (user.rows === 0) {
            console.log('unauth')
            res.send('Unauth')
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;