import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "113ch",
    },
  },
  beautify: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  buttonsDiv: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
    display: "flex",
    justifyContent: "center",
  },
  buttons: {
    padding: "10px 50px",
    margin: "0px 10px",
  },
  paper:{
    marginLeft: theme.spacing(15),
    marginRight: theme.spacing(15),
    marginBottom: theme.spacing(5),
    padding: theme.spacing(1),
  }
}));

const CreatePost = (props) => {
  const classes = useStyles();

  const schema = yup.object().shape({
    description: yup.string().required("Text is required"),
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
    <Container maxWidth="lg" className={classes.root}>
        <Paper variant="elevation" className={classes.paper}>
          <form
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
                Create a new post
              </Typography>
              <TextField
                id="outlined-basic"
                label="What's on your mind..."
                variant="outlined"
                multiline={true}
                minRows="5"
                helperText={errors.description?.message}
                error={errors.description?.message ? true : false}
                {...register("description")}
              />
              <div className={classes.buttonsDiv}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  type="submit"
                >
                  Create Post
                </Button>
              </div>
            </Box>
          </form>
        </Paper>
    </Container>
  );
};

export default CreatePost;
