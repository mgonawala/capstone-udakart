import React, {useState} from 'react'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import "./Login.css"
import {login} from "../auth/Auth";
import {useAppContext} from "../lib/contextLib";
import {useHistory} from 'react-router-dom'
import LoaderButton from "./LoaderButton";
import {useFormFields} from '../lib/formHooks'


export default function Login() {

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const {userHasAuthenticated, setAuthToken} = useAppContext();
  const [fields, setField] = useFormFields({
    email: '',
    password: ''
  });

  function validateForm(){
    console.log('function called'+isLoading);
    return fields.email.length>0 && fields.password.length>0
  }

  async function handleSubmit(event) {

    event.preventDefault();
    setIsLoading(true);

    const token = await login(fields.email,fields.password);
    if(token == undefined){
      userHasAuthenticated(false);
      alert('Login Unsuccessful');
      setIsLoading(false);
    }
    else {
      userHasAuthenticated(true)
      setAuthToken(token);
      localStorage.setItem('authToken',token);
      history.push('/');
    }
  }

  return(

      <div className={"Login"}>
        <form onSubmit={handleSubmit}>


          {/** Email Control **/}
          <FormGroup controlId={"email"} bsSize={"large"}>
            <ControlLabel>Email</ControlLabel>
            <FormControl type={"email"} value={fields.email} autoFocus onChange={setField}/>
          </FormGroup>

          {/* Password Control */}
          <FormGroup controlId={"password"} bsSize={"large"}>
            <ControlLabel>Password</ControlLabel>
            <FormControl type={"password"} value={fields.password} autoFocus onChange={setField}/>
          </FormGroup>

          <LoaderButton
              block
              type={"submit"}
              bsSize={"large"}
              disabled={!validateForm()}
              isLoading={isLoading}>
            Login
          </LoaderButton>
        </form>
      </div>
  );
}
