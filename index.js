require("dotenv/config");
require("./db.js");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT;

const errorHandler = require("./middlewares/errorHandler.js");

const userRouter = require("./routers/user-router.js");
const classActivityRouter = require("./routers/classActivity-router.js");
const approverRouter = require("./routers/approver-router.js");
const uploadRoute = require("./routers/routerUpload.js");
const messageRouter = require("./routers/message.router.js");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.use("/api/user", userRouter);
app.use("/api/classActivity", classActivityRouter);
app.use("/api/approver", approverRouter);
app.use("/api/message", messageRouter);
app.use("/api/uploadPPT", uploadRoute)

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Website listening on http://localhost:${PORT}`);
});
