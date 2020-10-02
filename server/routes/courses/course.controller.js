const Course = require("../../models/course.model");
const Student = require("../../models/student.model");

// Route: api/course/all
const getAllCourses = (req, res) => {
	Course.find()
		.then((course) => {
			res.status(200).json({
				success: true,
				data: course,
			});
			console.log("Course Object: " + course);
		})
		.catch((err) => {
			console.log(err);
		});
};

//Route: api/course/each
const getCourse = (req, res) => {
	var { courseName } = req.params;
	Course.findOne(
		{
			courseName: "AI",
		},
		{ students: 100 }
	)
		.then((result) => {
			Student.find({ _id: { $in: result["students"] } })
				.then((student) => {
					res.json(student);
				})
				.catch((e) => console.log(e));
		})
		.catch((e) => console.log(e));
};

//Route: Create Course
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
	getCourse,
};
