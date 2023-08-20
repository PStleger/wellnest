require("dotenv/config");
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/databs");
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT);
    });
});
