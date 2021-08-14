import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PostWithDetails from "../components/PostWithDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getOnePost,
  addCommentToPost,
  addUpVoteToPost,
  addDownVoteToPost,
} from "../redux/actions/posts";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

const PostPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [counter, setCounter] = useState(0);
  const userData = useSelector((state) => state.userLogin);
  const { loginUserLoading, user, error1 } = userData;

  const singlePost = useSelector((state) => state.singlePost);
  const { getOnePostLoading, post, error } = singlePost;

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleVoteUp = (postId) => {
    dispatch(addUpVoteToPost(postId, user.token));
    setCounter(counter + 1);
  };
  const handleVoteDown = (postId) => {
    dispatch(addDownVoteToPost(postId, user.token));
    setCounter(counter - 1);
  };

  const handleComment = (postId, comment) => {
    setCounter(counter + 1);
    dispatch(addCommentToPost(postId, { text: comment }, user.token));
  };

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    dispatch(getOnePost(id));
  }, [dispatch, counter]);
  return (
    <Container className={classes.root}>
      <Grid container justifyContent="center">
        {!getOnePostLoading && post && (
          <PostWithDetails post={post} handleComment={handleComment} handleVoteUp={handleVoteUp} handleVoteDown={handleVoteDown}/>
        )}
      </Grid>
    </Container>
  );
};

export default PostPage;
