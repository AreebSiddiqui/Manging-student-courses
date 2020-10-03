const Student = require("../../models/student.model");
const Course = require("../../models/course.model");
const getAllStudents = (req, res) => {
	Student.find()
		.then((student) => {
			res.status(200).json({
				success: true,
				data: student,
			});
			console.log("Students Object: " + student);
		})
		.catch((err) => {
			console.log(err);
		});
};

const saveStudentCourse = async (newStudent) => {
	// newStudent._id.map((course) => console.log(course));
	console.log(newStudent._id);
	console.log(newStudent.courses[0]);
	newStudent.courses.map((course) =>
		Course.updateOne(
			{ courseName: course },
			{ $push: { students: newStudent._id } }
		)
			.then(() => {
				console.log("updated");
			})
			.catch((e) => console.log(e))
	);
};
var studentID;
const { generateStudentUid } = require("./StudentUid");
const getUid = async () => {
	new Promise(async (req, res) => {
		try {
			studentID = await generateStudentUid();
			console.log(studentID);
		} catch (e) {
			console.log(e);
		}
	});
};

const createStudent = async (req, res) => {
	getUid();
	let { firstName, lastName, email, contact, address, courses } = req.body;

	const newStudent = new Student({
		studentID,
		firstName,
		lastName,
		email,
		contact,
		address,
		courses,
	});

	try {
		await newStudent.save();
		saveStudentCourse(newStudent);
		res.status(201).json({ success: true });
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	createStudent,
	getAllStudents,
};
