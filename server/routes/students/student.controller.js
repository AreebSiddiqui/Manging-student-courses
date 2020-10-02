const Student = require("../../models/student.model");
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

const createStudent = async (req, res) => {
	let {
		studentID,
		firstName,
		lastName,
		email,
		contact,
		address,
		courses,
	} = req.body;

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
		res.status(201).json({ success: true });
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	createStudent,
	getAllStudents,
};
