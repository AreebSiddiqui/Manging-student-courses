import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 220,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
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

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
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

const SelectCourses = () => {
	const getCourses = async () => {
		try {
			const response = await getAllCourses();
			// console.log(response.data);
			setCourse(response.data);
		} catch (error) {
			console.log("error", error);
		}
	};
	const classes = useStyles();
	const theme = useTheme();
	const [courses, setCourse] = React.useState([]);

	const handleChange = (event) => {
		setCourse(event.target.value);
	};
	useEffect(() => {
		getCourses();
	}, []);

	const names = courses.map((course) => {
		return course.courseName;
	});

	return (
		<div>
			<p>Hello</p>
			<FormControl className={classes.formControl}>
				<FormControl className={classes.formControl}>
					<InputLabel id="demo-mutiple-name-label">Courses</InputLabel>
					<Select
						labelId="demo-mutiple-name-label"
						id="demo-mutiple-name"
						multiple
						value={courses}
						onChange={handleChange}
						input={<Input />}
						MenuProps={MenuProps}
					>
						{names.map((name) => (
							<MenuItem
								key={name}
								value={name}
								style={getStyles(name, courses, theme)}
							>
								{name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</FormControl>
		</div>
	);
};

export default SelectCourses;
