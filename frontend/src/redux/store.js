import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  allPostsReducer,
  singlePostReducer,
  postsByUserIdReducer,
  createPostReducer,
  addCommentToPostReducer,
  addUpVoteToPostReducer,
  addDownVoteToPostReducer,
} from "./reducers/posts";
import { userRegisterReducer, userLoginReducer } from "./reducers/users";

const reducer = combineReducers({
  allPosts: allPostsReducer,
  singlePost: singlePostReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userPosts: postsByUserIdReducer,
  createPost: createPostReducer,
  addCommentToPost: addCommentToPostReducer,
  addUpVoteToPost: addUpVoteToPostReducer,
  addDownVoteToPost: addDownVoteToPostReducer,
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
  )
);

export default store;
