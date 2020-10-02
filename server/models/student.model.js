const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	studentID: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	courses: {
		type: Array,
		required: true,
	},
});
var collectionName = "student";
const Student = mongoose.model("student", studentSchema, collectionName);
module.exports = Student;
