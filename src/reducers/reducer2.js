import {SIGNIN_SUCCESS, SIGNIN_FAILURE, FILEUPLOAD_SUCCESS, RECENTFILE_SUCCESS} from "../actions/index";
import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';
//import {createBrowserHistory} from 'history';
import Newpage from "../components/Newpage"; 
//export const history = createBrowserHistory();


// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {
        //fileid: '',
       // filename: '',
        //filetype: '',
        //message: ''
};


export const files = (state = initialState, action) => {


    switch (action.type) {
        case RECENTFILE_SUCCESS :
        console.log("files retrieved and adding to state");
        console.log( action.file);
        var currState = state;
        
        //history.push('/Newpage');
           return {
               ...state,
               "files" : action.file
           };
        default :
            return state;

    }
};

//export default file;
//export default orders;




