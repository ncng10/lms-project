const router = require("express").Router();

//register
router.post('/', async (req, res) => {
    try {

    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})

module.exports = router;