import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CreatePost from "../components/CreatePost";
import PostWithDetails from "../components/PostWithDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPostsByUserId,
  createPost,
  addCommentToPost,
  addUpVoteToPost,
  addDownVoteToPost,
} from "../redux/actions/posts";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

const ProfilePage = () => {
  const [counter, setCounter] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userLogin);
  const { loginUserLoading, user, error1 } = userData;

  const postsData = useSelector((state) => state.userPosts);
  const { loadPostsByUserIdLoading, posts, error2 } = postsData;

  const handleVoteUp = (postId) => {
    dispatch(addUpVoteToPost(postId, user.token));
    setCounter(counter + 1);
  };
  const handleVoteDown = (postId) => {
    dispatch(addDownVoteToPost(postId, user.token));
    setCounter(counter - 1);
  };

  const handleForm = (values) => {
    dispatch(createPost(user.id, values, user.token));
    setCounter(counter + 1);
  };

  const handleComment = (postId, comment) => {
    dispatch(addCommentToPost(postId, { text: comment }, user.token));
    setCounter(counter + 1);
  };

  useEffect(() => {
    dispatch(loadPostsByUserId(user.id, user.token));
  }, [dispatch, counter]);

  return (
    <Container className={classes.root}>
      <Grid container justifyContent="center">
        <CreatePost handleForm={handleForm} />
      </Grid>
      <Grid container justifyContent="center">
        {posts?.posts?.map((post) => (
          <PostWithDetails
            post={post}
            key={post._id}
            handleComment={handleComment}
            handleVoteUp={handleVoteUp}
            handleVoteDown={handleVoteDown}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
