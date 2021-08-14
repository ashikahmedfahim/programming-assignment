import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import TextField from "@material-ui/core/TextField";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 750,
    "& .MuiTextField-root": {
      width: "88ch",
      marginBottom: theme.spacing(3),
    },
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
  buttons: {
    padding: "10px 150px",
    margin: "0px 40px",
  },
  beautify: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const PostWithDetails = (props) => {
  const classes = useStyles();

  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  const  handleComment = () => {
    props.handleComment(props.post._id,comment);
  }

  const handleVoteUp = () => {
    props.handleVoteUp(props.post._id);
  }
  const handleVoteDown = () => {
    props.handleVoteDown(props.post._id);
  }

  return (
    <div style={{ margin: "20px 0px" }}>
      <Grid item xs={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h2" component="h2">
              {props.post.user.email.split("@")[0]}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="p">
              {props.post.description}
            </Typography>
          </CardContent>
          <CardContent className={classes.beautify}>
            <Typography
              variant="h5"
              component="p"
              style={{ display: "inline-block" }}
            >
              <span>
                Up Votes: {props.post.upVote && props.post.upVote.length}
              </span>
            </Typography>
            <Typography
              variant="h5"
              component="p"
              style={{ display: "inline-block" }}
            >
              <span>
                Down Votes: {props.post.downVote && props.post.downVote.length}
              </span>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.buttons}
              onClick={handleVoteUp}
            >
              <ThumbUpIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.buttons}
              onClick={handleVoteDown}
            >
              <ThumbDownIcon />
            </Button>
          </CardActions>
          <CardContent>
            <Typography variant="h5" component="h2">
              Comments
            </Typography>
          </CardContent>
          <CardContent>
            {props.post.comment.length > 0 &&
              props.post.comment.map((comment) => (
                <Comment commentData={comment} key={comment._id+comment.commentBy} />
              ))}
          </CardContent>
          <CardContent>
            <TextField id="standard-search" label="Comment" onChange={handleChange}/>
            <br />
            <Button variant="contained" color="primary" onClick={handleComment}>
              Add Comment
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default PostWithDetails;
