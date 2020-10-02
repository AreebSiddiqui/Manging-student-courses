const express = require("express");
const router = express.Router();

const { getAllStudents, createStudent } = require("./student.controller");

router.get("/all", getAllStudents);
router.post("/create", createStudent);
module.exports = router;
