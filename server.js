const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/Student");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/submit", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.redirect("/students");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving student");
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.render("students", { students });
  } catch (err) {
    res.status(500).send("Error fetching students: " + err.message);
  }
});

app.post("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/students");
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).send("Error deleting student");
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
