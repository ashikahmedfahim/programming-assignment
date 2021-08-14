import {
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ONE_POST_SUCCESS,
  GET_ONE_POST_FAILURE,
  GET_ONE_POST_REQUEST,
  LOAD_POSTS_BY_USER_ID_SUCCESS,
  LOAD_POSTS_BY_USER_ID_FAILURE,
  LOAD_POSTS_BY_USER_ID_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  ADD_COMMENT_TO_POST_SUCCESS,
  ADD_COMMENT_TO_POST_FAILURE,
  ADD_COMMENT_TO_POST_REQUEST,
  ADD_UP_VOTE_TO_POST_REQUEST,
  ADD_DOWN_VOTE_TO_POST_REQUEST,
  ADD_UP_VOTE_TO_POST_SUCCESS,
  ADD_DOWN_VOTE_TO_POST_SUCCESS,
  ADD_UP_VOTE_TO_POST_FAILURE,
  ADD_DOWN_VOTE_TO_POST_FAILURE,
} from "../types/posts";
import axios from "axios";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POSTS_REQUEST });
    const { data } = await axios.get("http://localhost:5000/posts");
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_POSTS_FAILURE, payload: error });
  }
};

export const getOnePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ONE_POST_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/posts/${id}`);
    dispatch({ type: GET_ONE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ONE_POST_FAILURE, payload: error });
  }
};

export const loadPostsByUserId = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_POSTS_BY_USER_ID_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/users/${userId}/posts`,
      { headers: { token: token } }
    );
    dispatch({ type: LOAD_POSTS_BY_USER_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_POSTS_BY_USER_ID_FAILURE, payload: error });
  }
};

export const createPost = (userId, post, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });
    const { data } = await axios.post(
      `http://localhost:5000/users/${userId}/posts`,
      post,
      { headers: { token: token } }
    );
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};

export const addCommentToPost = (postId, comment, token) => async ( dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT_TO_POST_REQUEST });
    const { data } = await axios.patch(
      `http://localhost:5000/posts/${postId}/comment`,
      comment,
      { headers: { token: token } }
    );
    dispatch({ type: ADD_COMMENT_TO_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_COMMENT_TO_POST_FAILURE, payload: error });
  }
};

export const addUpVoteToPost = (postId, token) => async ( dispatch) => {
  try {
    dispatch({ type: ADD_UP_VOTE_TO_POST_REQUEST });
    const { data } = await axios.patch(
      `http://localhost:5000/posts/${postId}/upVote`,
      { headers: { token: token } }
    );
    dispatch({ type: ADD_UP_VOTE_TO_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_UP_VOTE_TO_POST_FAILURE, payload: error });
  }
}

export const addDownVoteToPost = (postId, token) => async ( dispatch) => {
  try {
    dispatch({ type: ADD_DOWN_VOTE_TO_POST_REQUEST });
    const { data } = await axios.patch(
      `http://localhost:5000/posts/${postId}/downVote`,
      { headers: { token: token } }
    );
    dispatch({ type: ADD_DOWN_VOTE_TO_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_DOWN_VOTE_TO_POST_FAILURE, payload: error });
  }
}


