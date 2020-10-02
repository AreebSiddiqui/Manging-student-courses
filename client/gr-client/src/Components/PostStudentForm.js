import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));
const PostStudentForm = () => {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<div>
				<TextField
					required
					id="outlined-required"
					label="First Name"
					defaultValue=""
					variant="outlined"
				/>
				<TextField
					required
					id="outlined-required"
					label="Last Name"
					defaultValue=""
					variant="outlined"
				/>{" "}
				<TextField
					required
					id="outlined-required"
					label="Email Name"
					defaultValue=""
					variant="outlined"
				/>
				<TextField
					required
					id="outlined-required"
					label="Phone Number"
					defaultValue=""
					variant="outlined"
				/>
				<TextField
					required
					id="outlined-required"
					label="Address"
					defaultValue=""
					variant="outlined"
				/>{" "}
			</div>
		</form>
	);
};

export default PostStudentForm;
