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
})

module.exports = router;