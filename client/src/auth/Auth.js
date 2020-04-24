
import React from 'react';
import Axios from 'axios'
import {useAppContext} from "../lib/contextLib";

const USERS_SERVICE =  process.env.REACT_APP_USERS_SERVICE
const SIGNUP_API = `http://${USERS_SERVICE}/api/v0/users/auth`;
const LOGIN_API = `http://${USERS_SERVICE}/api/v0/users/auth/login`;
const VERIFY_API = `http://${USERS_SERVICE}/api/v0/users/auth/verification`;

   export async function login(e, p) {
     /* const response = {
        data: {
          token: '1234'
        }
      }*/
     try {
       const response = await Axios({
         method: 'post',
         url: LOGIN_API,
         data: {
           email: e,
           password: p
         },
         header: {
           'Content-Type': 'applicaiton/json',
           'Accept': 'application/json'
         }
       });

       return response.data.token;
     }
     catch (e) {
       return undefined;
     }

  }


export async function signup(email, password) {

  try {
    const response = await Axios({
      method: 'post',
      url: SIGNUP_API,
      data: {
        email: email,
        password: password
      },
      header: {
        'Content-Type': 'applicaiton/json',
        'Accept': 'application/json'
      }
    });
    {/** returns token & user.email **/}
    return response.data;
  }
  catch (e) {
    return undefined;
  }

}
{/* Verify JWT Auth Token*/}
export async function verifyToken(token) {
     console.log(token);
       try {
         const response = await Axios({
           method: 'get',
           url: VERIFY_API,
           headers: {
             'Content-Type': 'applicaiton/json',
             'Authorization': `Bearer ${token}`
           }
         });
         if( response.status == 200){
           return true;
         }
         else{
           return false;
         }
         return true;

       }
       catch (e) {
         return false;
       }


}

