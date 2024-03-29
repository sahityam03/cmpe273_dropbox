import React, {Component} from 'react';
import {connect} from 'react-redux';

//import {addToOrder} from "../action/index";

import RecentItemDisplay from "./RecentItemDisplay";
import StarItemDisplay from "./StarItemDisplay";
import UploadFile from "./UploadFile";
import  '../styles/stylessheet.css';
//import ./App.css;


class HomePage extends Component {

    render() {
      console.log("i am in homepage");
        console.log(this.props);
        return (
            <div className="container-fluid">
                <div className = "row">
            
                
                    <div className="col-md-2 sidenav hidden-xs sidebar" style={{'backgroundColor': 'lightblue', 'height': '100vh'}}>
                        <br />
                        <h3 className="text-center">Dropbox</h3>
                        <br />
                        <ul className = "nav nav-list">
                        <li><a href="/HomePage">Home</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="/FilesPage">Files</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="/AboutPage">About</a></li>
                        </ul>
                    </div>

                    <div className="col-md-8" style={{'width': '650px'}}>
                      <div className="container-fluid">
                       <h2 className="text-center">Home</h2> 
                       
                          <h4>Starred</h4>
                          <hr/>
                       
                          
                        
                       </div>

                       <div className="container-fluid">
                          <h4> Recent </h4>
                          <hr />

                       
                          <RecentItemDisplay />
                       
                       </div>
                    </div>
                    <div className = "col-md-2  "  style={{'backgroundColor': 'lightblue', 'height': '100vh'}}>
                        <div>
                        <br />
                        <br/>
                        <br />
                        <ul className = "nav nav-list">
                          <li><UploadFile /></li>
                          </ul>
                        <ul className = "nav nav-list">
                          <li><a href="">New Folder</a></li>
                        </ul>
                    
                        </div>
                    </div>
            
                </div>
            </div>

       );
    }
}


export default HomePage;

