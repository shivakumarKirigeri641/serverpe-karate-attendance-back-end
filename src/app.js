const express = require("express");
const app = express();
const { connectKarateAttendanceDb } = require("./database/connectDb");
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin:'http://localhost:1234', credentials:true}));

connectKarateAttendanceDb();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});