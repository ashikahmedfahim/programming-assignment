import React from "react";
import Form from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/users";
import { useHistory } from "react-router-dom";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleForm =  (values) => {
     dispatch(registerUser(values));
  };
  return <Form value={"registration"} handleForm={handleForm} />;
};

export default RegistrationPage;
