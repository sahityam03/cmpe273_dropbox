import {SIGNIN_SUCCESS, SIGNIN_FAILURE, FILEUPLOAD_SUCCESS} from "../actions/index";
import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';
//import {createBrowserHistory} from 'history';
import Newpage from "../components/Newpage"; 
//export const history = createBrowserHistory();


// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {
        username: '',
        password: '',
        isLoggedIn: false,
        message: ''
};


const data = (state = initialState, action) => {


    switch (action.type) {
        case SIGNIN_SUCCESS :
        console.log("signin success");
        //history.push('/Newpage');
           return {
               ...state,
               username : action.userdata.username,
               password : action.userdata.password,
               isLoggedIn : true,
               message : 'welcome to dropbox'

           };

        case SIGNIN_FAILURE :
            return {
                ...state,
                isLogedIn : false,
                message : 'login details failed'
            };
        case FILEUPLOAD_SUCCESS:
        console.log("n file upload success");
        
            return {
              ...state,

              filename : action.filedata.fileName,
              status : false 
              //files.filename.status : 'uploaded'
              //files.[action.filedata.fileName] : 
              //files.filename.status : 'uploaded'

            }

        default :
            return state;

    }
};

export default data;
//export default orders;




