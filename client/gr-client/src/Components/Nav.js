import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PostStudent from "./PostStudentForm";
import StudentData from "./displayStudent";
import CourseData from "./displayCourse";
import PostCourse from "./PostCourse";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

const SimpleTabs = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs value={value} onChange={handleChange}>
					<Tab label="Register Student" />
					<Tab label="Resgister Course" />
					<Tab label="Student" />
					<Tab label="Course" />
				</Tabs>
			</AppBar>
			{value === 0 && <PostStudent />}
			{value === 1 && <PostCourse />}
			{value === 2 && <StudentData />}
			{value === 3 && <CourseData />}
		</div>
	);
};
export default SimpleTabs;

// 	const classes = useStyles();
// 	const [selectedTab, setSelectedTab] = React.useState(0);

// 	const handleChange = (event, newValue) => {
// 		setValue(newValue);
// 	};

// 				<Tabs
// 					value={value}
// 					onChange={handleChange}
//
// 				>
// 					<Tab label="Register Student"  />
// 					<Tab label="Resgister Course"  />
// 					<Tab label="Course"  />
// 					<Tab label="Student" />
// 				</Tabs>
