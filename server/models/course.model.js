const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
	courseID: {
		type: String,
		required: true,
	},
	courseName: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	students: {
		type: Array,
		required: true,
	},
});

var collectionName = "course";
const Course = mongoose.model("course", courseSchema, collectionName);

module.exports = Course;
