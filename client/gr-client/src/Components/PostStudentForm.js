import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import clsx from "clsx";
import Nav from "./Nav";
import axios from "axios";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
const BASE_URL = "http://localhost:5000/api";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
		button: {
			margin: theme.spacing(1),
		},
		form: {
			width: "100%", // Fix IE 11 issue.
			marginTop: theme.spacing(1),
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
			maxWidth: 300,
		},
	},
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, courses, theme) {
	return {
		fontWeight:
			courses.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const getAllCourses = async () =>
	new Promise(async (res, rej) => {
		try {
			const response = await axios.get(`${BASE_URL}/course/all`);
			if (response && response.data) res(response.data);
		} catch (error) {
			rej(error);
		}
	});
const PostStudentForm = () => {
	const getCourses = async () => {
		try {
			const response = await getAllCourses();
			// console.log(response.data);
			getCourse(response.data);
		} catch (error) {
			console.log("error", error);
		}
	};

	const _handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${BASE_URL}/student/create`, {
				studentID,
				firstName,
				lastName,
				address,
				email,
				contact,
				courses,
			})
			.then((result) => {
				console.log(result);
			})
			.catch((e) => console.log(e));
	};
	const classes = useStyles();
	const theme = useTheme();
	const [studentID, setStudentID] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [address, setAddress] = useState("");
	const [courses, setCourse] = useState([]);
	const [gcourse, getCourse] = useState([]);
	const handleChangeMultiple = (event) => {
		event.preventDefault();
		const { options } = event.target;
		const value = [];
		for (let i = 0, l = options.length; i < l; i += 1) {
			if (options[i].selected) {
				value.push(options[i].value);
				setCourse([...courses, value]);
			}
		}

		// console.log(("Courses", courses));
	};

	useEffect(() => {
		getCourses();
	}, []);
	const names = gcourse.map((course) => {
		return course.courseName;
	});
	// console.log("Name:", names);
	console.log("course", courses);

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={_handleSubmit}
		>
			<div>
				<h1>Student Registration Portal</h1>
				<div>
					{/* <Alert severity="success">Student Successfull enrolled</Alert>
					<br /> */}
					<TextField
						required
						name="studentID"
						id="outlined-required"
						label="ID"
						value={studentID}
						variant="outlined"
						onChange={(e) => setStudentID(e.target.value)}
					/>
					<br />
					<TextField
						required
						name="firstName"
						id="outlined-required"
						label="First Name"
						value={firstName}
						variant="outlined"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<br />
					<TextField
						name="lastName"
						id="outlined-required"
						label="Last Name"
						value={lastName}
						variant="outlined"
						onChange={(e) => setLastName(e.target.value)}
					/>{" "}
					<br />
					<TextField
						required
						name="email"
						id="outlined-required"
						label="Email"
						value={email}
						variant="outlined"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br />
					<TextField
						name="contact"
						required
						id="outlined-required"
						label="Contact No."
						value={contact}
						variant="outlined"
						onChange={(e) => setContact(e.target.value)}
					/>
					<br />
					<TextField
						name="address"
						required
						value={address}
						id="outlined-required"
						label="Address"
						variant="outlined"
						onChange={(e) => setAddress(e.target.value)}
					/>
					<br />
					<FormControl className={classes.formControl}>
						<InputLabel shrink htmlFor="select-multiple-native">
							Courses
						</InputLabel>
						<Select
							multiple
							native
							value={gcourse[0]}
							onChange={handleChangeMultiple}
							inputProps={{
								id: "select-multiple-native",
							}}
						>
							{names.map((name) => (
								<option key={name} value={name}>
									{name}
								</option>
							))}
						</Select>{" "}
					</FormControl>
					<br />
					<br />
					<br />
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="small"
						className={classes.button}
						startIcon={<SaveIcon />}
					>
						save
					</Button>
					<br />
				</div>
			</div>
		</form>
	);
};

export default PostStudentForm;
