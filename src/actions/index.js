//import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';
import {store} from '../index.js';
//import Newpage from "./Newpage";
import fetch from 'isomorphic-fetch';
import { history } from '../helpers1/history1';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const FILEUPLOAD_SUCCESS = 'FILEUPLOAD_SUCCESS';

const headers = {
    'Accept': 'application/json'
};
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'


export function signinsuccess(userdata) {
	               console.log("this is in signIn sucees" + JSON.stringify(userdata));
                    
                    return {
                     type : SIGNIN_SUCCESS,
                     userdata                                // this is same as newItem : newItem in ES6
                    }                  
                
}
export function updateFileSuccessStatus(filedata) {
                 //console.log(JSON.stringify(this));
                 console.log("in uploadfilesuccessstatus");
                    
                    return {
                     type : FILEUPLOAD_SUCCESS,
                     filedata
                                                     // this is same as newItem : newItem in ES6
                    }                  
                
}
export function handleSubmit(userdata) {
    //console.log("this is in handle submit" + JSON.stringify(this));
  return dispatch => {
    
    return fetch(`${api}/user/doLogin`, {
        method: 'POST',

        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
    })
//      .then(response => response.status)
      .then(response => {
          console.log("this is in respronse " + response.getAllResponseHeaders());
            if (response.status === 201) { 
                dispatch(signinsuccess(userdata));
                history.push('/HomePage');
                 
            }
        })
  }
}

export function handleSignUp(signupdata) {
    //console.log("this is in handle submit" + JSON.stringify(this));
  return dispatch => {
    
    return fetch(`${api}/user/doSignUp`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupdata)
    })
      .then(response => response.status)
      .then(status => {
            if (status === 201) { 
                history.push('/');
                 
            }
        })
  }
}
export function handleUploadFile(filedata) {
  const payload = new FormData();
  payload.append('myfile', filedata.fileHandle);
  console.log("this is filedata" + JSON.stringify(filedata));
   
  return dispatch => {

         
    return fetch(`${api}/user/doUpload`, {
        credentials : 'include',
        method: 'POST',
                       
        body: payload 
        
    })
      .then(response => response.status)
      .then(status => {
            if (status === 201) { 
                console.log("in status 201");
                dispatch(updateFileSuccessStatus(filedata));
                history.push('/Newpage');
                 
            }
        })
  }
}

