const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./db');
const PORT = process.env.PORT || 5000;
const path = require("path");
app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build/")))
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    });
}

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build/index.html"))
// })

app.use('/auth', require('./routes/jwtAuth'))
app.use("/dashboard", require('./routes/dashboard'));
app.use("/admin-dashboard", require('./routes/admindashboard'));
app.use("/course-page", require('./routes/coursepage'));
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});