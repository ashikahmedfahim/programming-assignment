import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
});

const HomePagePost = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.post.user.email.split("@")[0]}
          </Typography>
          <Typography variant="body2" component="p">
            {props.post.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" size="small">
            <Link to={`/post/${props.post._id}`} className={classes.link}>See Details</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default HomePagePost;
