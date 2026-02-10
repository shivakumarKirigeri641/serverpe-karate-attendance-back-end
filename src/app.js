const express = require("express");
const app = express();
const { connectKarateAttendanceDb } = require("./database/connectDb");
const cors = require("cors");
const router = require("./routers/router");

app.use(express.json());
app.use(cors({ origin:'http://localhost:1234', credentials:true}));
app.use("/api/karate/attendance", router);
connectKarateAttendanceDb();
app.listen(process.env.BACKENDPORT, () => {
    console.log(`Server is running on port ${process.env.BACKENDPORT}`);
});