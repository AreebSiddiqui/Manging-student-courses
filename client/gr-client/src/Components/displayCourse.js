import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);
const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});
const getAllCourses = async () =>
	new Promise(async (res, rej) => {
		try {
			const response = await axios.get(`${BASE_URL}/course/all`);
			if (response && response.data) res(response.data);
		} catch (error) {
			rej(error);
		}
	});

export default function DisplayCourse() {
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
	const [course, setCourse] = useState([]);
	const [cur, setCur] = useState([]);
	const each = () => {
		{
			axios
				.get(`${BASE_URL}/course/each`)
				.then((response) => {
					// console.log(response.data);
					setCur(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	const studentNames = cur.map((curcourses) => {
		return curcourses.firstName;
	});
	useEffect(() => {
		getCourses();
	}, []);

	return (
		<div>
			<div>
				<h1>Course Table</h1>
			</div>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<StyledTableRow>
							<StyledTableCell>Course ID</StyledTableCell>
							<StyledTableCell align="center">Course Name</StyledTableCell>
							<StyledTableCell align="center">Description</StyledTableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody>
						{course.map((row) => (
							<StyledTableRow key={row._id}>
								<StyledTableCell component="th" scope="row">
									{row.courseID}
								</StyledTableCell>
								<StyledTableCell align="center">
									<b>{row.courseName}</b>
								</StyledTableCell>
								<StyledTableCell align="center">
									{row.description}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
