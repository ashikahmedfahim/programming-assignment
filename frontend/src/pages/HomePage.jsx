import React, { useState, useEffect } from "react";
import HomePagePost from "../components/HomePagePost";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/actions/posts";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(5),
  },
}));

const HomePage = () => {
  const classes = useStyles();

  const postList = useSelector((state) => state.allPosts);
  const { getAllPostsLoading, posts, error } = postList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        {!posts ? (
          <></>
        ) : (
          Object.keys(posts).map((key) => <HomePagePost post={posts[key]} key={posts[key]._id} />)
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
