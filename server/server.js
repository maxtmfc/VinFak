const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const store = require("session-file-store");
const wineRouter = require("./routes/wineRouter");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/authRouter");
const accountRouter = require("./routes/accountRouter");
const bestRouter = require("./routes/bestRouter");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const FileStore = store(session);

const sessionConfig = {
  name: "vinfak_sid",
  secret: process.env.SESSION_SECRET ?? "test",
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(session(sessionConfig));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/wine", wineRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/account", accountRouter);
app.use("/best", bestRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
