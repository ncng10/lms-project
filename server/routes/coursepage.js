const router = require("express").Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/upload-file', authorization, async (req, res) => {
    try {
        const { fileDescription, file_upload } = req.body;
        const fileUpload = await pool.query(
            "INSERT INTO files (file_description, file_upload, user_id) VALUES($1,$2,$3)", [fileDescription,
            file_upload, req.user
        ]
        )
        res.json(fileUpload.rows)
    } catch (error) {
        console.log(error);
        res.send('error')
    }
});

//gets all files from database
router.get('/files', authorization, async (req, res) => {
    try {
        const getFile = await pool.query(
            "SELECT * FROM files WHERE user_id = $1", [req.user]
        )
        res.json(getFile.rows)
    } catch (error) {
        console.log(error);
        res.send('Error')
    }
});

//gets course material by course id and user id.
router.get('/assignment-groups-material/:courseID', authorization, async (req, res) => {
    try {
        const { courseID } = req.params;
        const getAssignmentGroupsMaterial = await pool.query(
            "SELECT assignments.assignment_name ,assignment_group.course_id, assignment_group.user_id, assignment_group_name, users.user_id FROM assignment_group LEFT JOIN users ON users.user_id = assignment_group.user_id LEFT JOIN assignments ON assignments.assignment_group_id = assignment_group.assignment_group_id WHERE assignment_group.user_id =$1 and assignment_group.course_id = $2",
            [req.user, courseID]
        )
        res.json(getAssignmentGroupsMaterial.rows)
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
});

module.exports = router;