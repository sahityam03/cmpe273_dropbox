import React, {Component} from 'react';
import {connect} from 'react-redux';

//import {addToOrder} from "../action/index";

//import RecentItemDisplay from "./RecentItemDisplay";
import AllFiles from "./AllFiles";
import UploadFile from "./UploadFile";
//import ./App.css;


class FilesPage extends Component {

    render() {
      console.log("i am in Files");
        
        return (
            <div className="container-fluid">
                <div className = "row">
            
                
                    <div className="col-md-2 sidenav hidden-xs sidebar" style={{'backgroundColor': 'lightblue', 'height': '100vh'}}>
                        <br />
                        <h3 className="text-center">Files</h3>
                        <br />
                        <ul className = "nav nav-list">
                        <li><a href="/HomePage">Home</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="/FilesPage">Myfiles</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="/Deletedfiles">Deleted Files</a></li>
                        </ul>
                    </div>

                    <div className="col-md-8" style={{'width': '650px'}}>

                       <h3 >Dropbox</h3> 
                       
                       <div>
                          

                       
                          <AllFiles />
                       
                       </div>
                    </div>
                    <div className = "col-md-2 col-md-offset-3"  style={{'backgroundColor': 'lightblue', 'height': '100vh'}}>
                        <div>
                        <br />
                        <br />
                        <br />
                        <ul className = "nav nav-list">
                          <li><UploadFile /></li>
                        </ul>
                    
                        </div>
                    </div>
            
                </div>
            </div>


       );
    }
}
export default FilesPage;

