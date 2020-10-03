const crypto = require("crypto");
const Student = require("../../models/student.model");

const generateStudentUid = async () => {
	for (;;) {
		let studentID = crypto.randomBytes(6).toString("hex");

		const result = await Student.findOne({
			studentID: studentID,
		}).exec();
		if (result === null) return studentID;
	}
};

module.exports = {
	generateStudentUid,
};
