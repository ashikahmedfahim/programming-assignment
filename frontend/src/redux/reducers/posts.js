import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ONE_POST_REQUEST,
  GET_ONE_POST_SUCCESS,
  GET_ONE_POST_FAILURE,
  LOAD_POSTS_BY_USER_ID_REQUEST,
  LOAD_POSTS_BY_USER_ID_SUCCESS,
  LOAD_POSTS_BY_USER_ID_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  ADD_COMMENT_TO_POST_REQUEST,
  ADD_COMMENT_TO_POST_SUCCESS,
  ADD_COMMENT_TO_POST_FAILURE,
  ADD_UP_VOTE_TO_POST_REQUEST,
  ADD_DOWN_VOTE_TO_POST_REQUEST,
  ADD_UP_VOTE_TO_POST_SUCCESS,
  ADD_DOWN_VOTE_TO_POST_SUCCESS,
  ADD_UP_VOTE_TO_POST_FAILURE,
  ADD_DOWN_VOTE_TO_POST_FAILURE,
} from "../types/posts";

export const allPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSTS_REQUEST:
      return { getAllPostsLoading: true, posts: [] };
    case GET_ALL_POSTS_SUCCESS:
      return { getAllPostsLoading: false, posts: action.payload };
    case GET_ALL_POSTS_FAILURE:
      return { getAllPostsLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const singlePostReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ONE_POST_REQUEST:
      return { getOnePostLoading: true, post: {} };
    case GET_ONE_POST_SUCCESS:
      return { getOnePostLoading: false, post: action.payload };
    case GET_ONE_POST_FAILURE:
      return { getOnePostLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const postsByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS_BY_USER_ID_REQUEST:
      return { loadPostsByUserIdLoading: true, posts: [] };
    case LOAD_POSTS_BY_USER_ID_SUCCESS:
      return { loadPostsByUserIdLoading: false, posts: action.payload };
    case LOAD_POSTS_BY_USER_ID_FAILURE:
      return { loadPostsByUserIdLoading: false, error: action.payload };
    default:
      return state;
  }
}


export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { createPostLoading: true, post: {} };
    case CREATE_POST_SUCCESS:
      return { createPostLoading: false, post: action.payload };
    case CREATE_POST_FAILURE:
      return { createPostLoading: false, error: action.payload };
    default:
      return state;
  }
}  

export const addCommentToPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_TO_POST_REQUEST:
      return { addCommentToPostLoading: true };
    case ADD_COMMENT_TO_POST_SUCCESS:
      return { addCommentToPostLoading: false, post: action.payload };
    case ADD_COMMENT_TO_POST_FAILURE:
      return { addCommentToPostLoading: false, error: action.payload };
    default:
      return state;
  }
}

export const addUpVoteToPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_UP_VOTE_TO_POST_REQUEST:
      return { addUpVoteToPostLoading: true };
    case ADD_UP_VOTE_TO_POST_SUCCESS:
      return { addUpVoteToPostLoading: false, post: action.payload };
    case ADD_UP_VOTE_TO_POST_FAILURE:
      return { addUpVoteToPostLoading: false, error: action.payload };
    default:
      return state;
  }
}

export const addDownVoteToPostReducer = (state = {}, action) => { 
  switch (action.type) {
    case ADD_DOWN_VOTE_TO_POST_REQUEST:
      return { addDownVoteToPostLoading: true };
    case ADD_DOWN_VOTE_TO_POST_SUCCESS:
      return { addDownVoteToPostLoading: false, post: action.payload };
    case ADD_DOWN_VOTE_TO_POST_FAILURE:
      return { addDownVoteToPostLoading: false, error: action.payload };
    default:
      return state;
  }
}
