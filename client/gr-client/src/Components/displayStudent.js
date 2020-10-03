import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
const getAllStudents = async () =>
	new Promise(async (res, rej) => {
		try {
			const response = await axios.get(`${BASE_URL}/student/all`);
			if (response && response.data) res(response.data);
		} catch (error) {
			rej(error);
		}
	});

export default function BasicTable() {
	const getStudents = async () => {
		try {
			const response = await getAllStudents();
			console.log(response.data);
			setStudent(response.data);
		} catch (error) {
			console.log("error", error);
		}
	};
	const classes = useStyles();
	const [student, setStudent] = useState([]);
	useEffect(() => {
		getStudents();
	}, []);

	return (
		<div>
			<div>
				<h1>Student Table</h1>
			</div>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<StyledTableRow>
							<StyledTableCell>Student ID</StyledTableCell>
							<StyledTableCell align="right">First Name</StyledTableCell>
							<StyledTableCell align="right">Last Name</StyledTableCell>
							<StyledTableCell align="right">Phone#</StyledTableCell>
							<StyledTableCell align="right">Email</StyledTableCell>
							<StyledTableCell align="right">Courses</StyledTableCell>
							<StyledTableCell align="right"></StyledTableCell>
							<StyledTableCell align="right"></StyledTableCell>
							<StyledTableCell align="right"></StyledTableCell>
							<StyledTableCell align="right"></StyledTableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody>
						{student.map((row) => (
							<StyledTableRow key={row._id}>
								<StyledTableCell component="th" scope="row">
									{row.studentID}
								</StyledTableCell>
								<StyledTableCell align="right">{row.firstName}</StyledTableCell>
								<StyledTableCell align="right">{row.lastName}</StyledTableCell>
								<StyledTableCell align="right">{row.contact}</StyledTableCell>
								<StyledTableCell align="right">{row.email}</StyledTableCell>
								{row.courses.map((course) => (
									<StyledTableCell key={course._id} align="right">
										{course}
									</StyledTableCell>
								))}

								{/* <StyledTableCell key={row.course._id} align="right">
									<p>
										{student.map((row) =>
											row.courses.map((course) => {
												<p>{course}</p>
											})
										)}
									</p>
								</StyledTableCell> */}
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
