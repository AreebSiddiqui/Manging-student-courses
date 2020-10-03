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

const PostCourseForm = () => {
	const _handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${BASE_URL}/course/create`, {
				courseID,
				courseName,
				description,
			})
			.then((result) => {
				console.log(result);
			})
			.catch((e) => console.log(e));
	};
	const classes = useStyles();
	const theme = useTheme();
	const [courseID, setCourseID] = useState("");
	const [courseName, setCourseName] = useState("");
	const [description, setDescription] = useState("");

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={_handleSubmit}
		>
			<div>
				<h1>Course Registration Portal</h1>
				<div>
					<TextField
						required
						name="courseID"
						id="outlined-required"
						label="ID"
						value={courseID}
						variant="outlined"
						onChange={(e) => setCourseID(e.target.value)}
					/>
					<br />
					<TextField
						required
						name="courseName"
						id="outlined-required"
						label="Course Name"
						value={courseName}
						variant="outlined"
						onChange={(e) => setCourseName(e.target.value)}
					/>
					<br />
					<TextField
						required
						name="description"
						id="outlined-required"
						label="Description"
						value={description}
						variant="outlined"
						onChange={(e) => setDescription(e.target.value)}
					/>{" "}
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

export default PostCourseForm;
