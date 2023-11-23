require("dotenv/config");
const express = require("express");

const cors = require("cors");
const app = express();
const connectDB = require("./config/databs");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const articlesRouter = require("./routes/articles");
const journalsRouter = require("./routes/journals");
const progressRouter = require("./routes/progress");
const PORT = process.env.PORT || 8000;
const path = require("path");

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/articles", articlesRouter);
app.use("/auth", authRouter);
app.use("/journals", journalsRouter);
app.use("/progress", progressRouter);

if (process.env.NODE_ENV === "production") {
    const buildPath = path.join(__dirname, "../client/dist");
    app.use(express.static(buildPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT);
    });
});
