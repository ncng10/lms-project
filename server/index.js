const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const pool = require('./db');


app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/jwtAuth'))
app.use("/dashboard", require('./routes/dashboard'));
app.use("/admin-dashboard", require('./routes/admindashboard'));
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});