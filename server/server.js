const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const database_uri = require("./config/key.js").mongoURI;
const apiRoutes = require("./routes/api-routes");
const students = require("./routes/students/student.router");
const courses = require("./routes/courses/course.router");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

mongoose
	.connect(database_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected successfully!");
	})
	.catch((err) => {
		console.log("Error: " + err);
	});

app.use(bodyParser.json());

app.use("/api", apiRoutes);
app.use("/api/student", students);
app.use("/api/course", courses);

app.get("/", (req, res) => {
	res.end("Hello world");
});

app.listen(PORT, () => {
	console.log(`🚀 App started at ${PORT}`);
});
