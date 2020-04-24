import React, {useState} from 'react';
import {Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useFormFields} from "../lib/formHooks";
import LoaderButton from "./LoaderButton";
import "./Signup.css";
import {signup} from "../auth/Auth";
import {useAppContext} from "../lib/contextLib";


export default function Signup(){

  const {authToken, setAuthToken} = useAppContext();
  const {isAuthenticated, userHasAuthenticated} = useAppContext();
  const history = useHistory();

  const [fields, setFields] = useFormFields({
    email: '',
    password:'',
    firstName: '',
    lastName: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event){
      event.preventDefault();

      setIsLoading(true)

     const response = await signup(fields.email, fields.password);

     if(response != undefined){
        setAuthToken(response.token);
        userHasAuthenticated(true);
        alert('Successfully Signed Up.')
        history.push('/');
     }
      else{
      userHasAuthenticated(false);
      setAuthToken('');
       setIsLoading(false);
      alert('Can not sign up.');
     }
  }

  function validateForm() {
    return (
        fields.email.length > 0 &&
        fields.password.length > 0
    );
  }

  return(

      <div className={"Signup"}>
      <form onSubmit={handleSubmit}>

        <FormGroup controlId="firstName" bsSize="large">
          <ControlLabel>First Name :</ControlLabel>
          <FormControl type={"text"} value={fields.firstName} onChange={setFields} autoFocus />
        </FormGroup>

        <FormGroup controlId="lastName" bsSize="large">
          <ControlLabel>Last Name :</ControlLabel>
          <FormControl type={"text"} value={fields.lastName} onChange={setFields} autoFocus />
        </FormGroup>

        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email :</ControlLabel>
          <FormControl type={"email"} value={fields.email} onChange={setFields} autoFocus />
        </FormGroup>

        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password :</ControlLabel>
          <FormControl type={"password"} value={fields.password} onChange={setFields} autoFocus />
        </FormGroup>

        <LoaderButton
          block
          type={"submit"}
          bsSize={"large"}
          isLoading={isLoading}
          disabled={!validateForm()}
        >
            Sign Up !
        </LoaderButton>

      </form>
      </div>
  );

}