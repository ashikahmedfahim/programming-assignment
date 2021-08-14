import React, { useEffect } from "react";
import Form from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/users";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const user = useSelector((state) => state.userLogin);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleForm = (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (user && user.user) {
      history.push("/profile");
    }
  });
  return <Form value={"login"} handleForm={handleForm} />;
};

export default LoginPage;
