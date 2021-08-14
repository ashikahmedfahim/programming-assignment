import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    "& .MuiBox-root": {
      width: "52ch",
    },
  },
  beautify: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsDiv: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    padding: "10px 50px",
    margin: "0px 10px",
  },
  suggestion: {
    marginLeft: theme.spacing(1.5),
    marginTop: theme.spacing(1),
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (value) => props.handleForm(value);

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper variant="elevation">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box>
              <Typography
                variant="h3"
                color="textSecondary"
                gutterBottom
                className={classes.beautify}
              >
                {props.value === "login" ? "Login" : "Register"}
              </Typography>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                required
                helperText={errors.email?.message}
                error={errors.email?.message ? true : false}
                {...register("email")}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                required
                helperText={errors.password?.message}
                error={errors.password?.message ? true : false}
                {...register("password")}
              />
              <Typography
                variant="caption"
                color="primary"
                gutterBottom
                className={classes.suggestion}
              >
                <Link to={props.value === "login" ? "/register" : "/login"}>
                  {props.value === "login"
                    ? "Don't have an account? Register here."
                    : "Already have an account? Login here"}
                </Link>
              </Typography>
              <div className={classes.buttonsDiv}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttons}
                  onClick={() => history.goBack()}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  type="submit"
                >
                  {props.value === "login" ? "Login" : "Register"}
                </Button>
              </div>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Form;
