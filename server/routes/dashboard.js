const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    try {
        //req.user has payload
        const user = await pool.query("SELECT user_name, user_role FROM users WHERE user_id = $1", [
            req.user
        ])
        res.json(user.rows[0]);

    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});


router.get('/courses', authorization, async (req, res) => {
    try {
        const courses = await pool.query("SELECT user_name, user_role,user_email,courses.course_name, courses.course_id, users.user_id, enrollment.user_id FROM users LEFT JOIN enrollment ON users.user_id = enrollment.user_id LEFT JOIN courses ON courses.course_id = enrollment.course_id WHERE enrollment.user_id =$1", [
            req.user
        ])
        res.json(courses.rows);
        console.log(req.user)
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/enroll', authorization, async (req, res) => {
    try {
        const { course_id } = req.body;
        const enrollInCourse = await pool.query(
            "INSERT INTO enrollment(course_id, user_id) VALUES($1,$2)",
            [course_id, req.user]
        );
        res.json(enrollInCourse.rows);
    } catch (error) {
        console.log(error.message)
    }
});


module.exports = router;