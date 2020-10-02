const Course = require("../../models/course.model");
const getAllCourses = (req, res) => {
	Course.find()
		.then((course) => {
			res.status(200).json({
				success: true,
				data: course,
			});
			console.log("Cousres Object: " + course);
		})
		.catch((err) => {
			console.log(err);
		});
};

const createCourse = async (req, res) => {
	let { courseID, courseName, description, students } = req.body;

	const newCourse = new Course({
		courseID,
		courseName,
		description,
		students,
	});

	try {
		await newCourse.save();
		res.status(201).json({ success: true });
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	getAllCourses,
	createCourse,
};
