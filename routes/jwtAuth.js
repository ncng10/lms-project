const router = require("express").Router();
const pool = require('../db');
var bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validinfo');
const authorization = require('../middleware/authorization');


//register
router.post('/register', validInfo, async (req, res) => {
    try {
        const { name, email, password, userRole } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password, user_role) VALUES($1,$2,$3,$4) RETURNING * ", [
            name, email, bcryptPassword, userRole
        ]);

        const token = jwtGenerator(newUser.rows[0].user_id);
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists")
        }
        return res.json({ token });
    } catch (err) {

        res.status(500).send("server error");
    }
})

//login

router.post('/login', validInfo, async (req, res) => {
    try {
        const { email, password, userRole } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 AND user_role =$2", [
            email, userRole
        ]);
        if (user.rows.length === 0) {
            return res.status(401).json('Password and/or email is incorrect does not exist')
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json('Password and/or email is incorrect');
        }
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token })

    } catch (err) {
        console.log(err.message)
    }
})

router.post('/admin-login', validInfo, async (req, res) => {
    try {
        const { email, password, userRole } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 AND user_role =$2 ", [
            email, userRole
        ]);
        if (user.rows.length === 0) {
            return res.status(401).json('Password and/or email is incorrect does not exist')
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json('Password and/or email is incorrect');
        }
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token })

    } catch (err) {
        console.log(err.message)
    }
})

router.post('/is-verify', authorization, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});



module.exports = router;