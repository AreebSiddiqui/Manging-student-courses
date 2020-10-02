const express = require("express");
const router = express.Router();

const {
	getAllCourses,
	createCourse,
	getCourse,
} = require("./course.controller");

router.get("/all", getAllCourses);
router.get("/each", getCourse);
router.post("/create", createCourse);
module.exports = router;
