const express = require("express");
const router = express.Router();

const { getAllCourses, createCourse } = require("./course.controller");

router.get("/all", getAllCourses);
router.post("/create", createCourse);
module.exports = router;
