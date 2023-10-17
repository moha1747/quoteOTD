import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import User from "./user.cjs";
import Quote from "./quote.cjs";
import users from "./api/users.route.js"
import { hash, compare } from "bcrypt";
import session from "express-session";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(json());

connect("mongodb://localhost:27017/QuoteOTD", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({ message: "User registered!" });
  } catch (error) {
    res.status(400).send({ error: "Registration failed." });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && (await compare(req.body.password, user.password))) {
    res.send({ message: "Logged in!", userId: user._id });
    res.render("quote.jsx")
  } else {
    res.status(400).send({ error: "Login failed." });
  }
});
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send({ success: false, message: "Failed to logout!" });
    }
    res.send({ success: true, message: "Logged out!" });
  });
});

app.post("/savequote", async (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text)
    return res.status(400).send({ error: "Incomplete data." });

  const quote = new Quote({ userId, text });
  await quote.save();
  res.send({ message: "Quote saved!" });
});

app.get("/", (req, res) => {
  res.send("Welcome to the QuoteOTD API!");
});
app.get("/login", (req, res) => {
  return res.get();
});
app.use("/api/users", users);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
