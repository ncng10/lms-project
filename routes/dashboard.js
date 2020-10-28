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
router.get('/admin-verif', authorization, async (req, res) => {
    try {
        //req.user has payload
        const user = await pool.query("SELECT user_name, user_role FROM users WHERE user_id = $1 AND user_role ='Admin'", [
            req.user
        ])
        res.json(user.rows[0]);

    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});




router.get('/enrolled-courses', authorization, async (req, res) => {
    try {
        const courses = await pool.query(
            "SELECT DISTINCT user_name, user_role,user_email,courses.course_name, courses.course_instructor, courses.course_id, users.user_id, enrollment.user_id FROM users LEFT JOIN enrollment ON users.user_id = enrollment.user_id LEFT JOIN courses ON courses.course_id = enrollment.course_id WHERE enrollment.user_id =$1", [
            req.user
        ])
        res.json(courses.rows);
        console.log(req.user)
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/available-courses', authorization, async (req, res) => {
    try {
        const courses = await pool.query(
            "SELECT * FROM courses")
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
        res.send('error')

    }
});

router.get('/all-courses', authorization, async (req, res) => {
    try {
        const allCourses = await pool.query(
            "SELECT * FROM courses"
        )
        res.json(allCourses.rows)
    } catch (error) {
        console.log(error.message)
    }
});

router.delete('/enrolled-courses/delete-course/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCourse = await pool.query(
            "DELETE FROM courses WHERE course_id = $1 and user_id = $2 RETURNING *",
            [id, req.user]
        )
        if (deleteCourse.rows.length === 0) {
            res.json("You cannot delete this course");
        }
        res.json("Course Deleted");
    } catch (error) {

    }
});

router.get('/files', authorization, async (req, res) => {
    try {
        const files = await pool.query(
            "SELECT * FROM files WHERE user_id = $1", [req.user]
        )
        res.json(files.rows);
    } catch (error) {
        console.log(error.message);
        res.send("Cant retrieve files")
    }
});


//allows admins to create a course for students to enroll in
router.post('/create-course', authorization, async (req, res) => {
    try {
        const {
            courseName,
            openEnrollment,
            restrictedEnrollment,
            userName,
        } = req.body;
        const newCourse = await pool.query(
            "INSERT INTO courses (course_name, open_enrollment,restricted_enrollment, course_instructor, course_instructor_id) VALUES($1,$2,$3,$4,$5)",
            [courseName, openEnrollment, restrictedEnrollment, userName, req.user]
        );
        res.json(newCourse.rows)
    } catch (error) {
        console.log(error.message);
        res.send("cant create course")
    }
});

//gets all courses currently logged in admin teaches

router.get('/taught-courses', authorization, async (req, res) => {
    try {
        const coursesTaught
            = await pool.query(
                "SELECT DISTINCT course_name, course_id FROM courses WHERE course_instructor_id = $1",
                [req.user]
            );
        res.json(coursesTaught.rows)
    } catch (error) {
        console.log(error.message);
        res.send("Cant get list of courses taught");
    }
})

module.exports = router;