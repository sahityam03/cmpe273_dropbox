import React, {Component} from 'react';
import {connect} from 'react-redux';

//import {addToOrder} from "../action/index";

import RecentItemDisplay from "./RecentItemDisplay";
//import StarItemDisplay from "./StarItemDisplay";
import UploadFile from "./UploadFile";
//import ./App.css;


class HomePage extends Component {

    render() {
      console.log("i am in homepage");
        console.log(this.props);
        return (
            <div className="container-fluid">
            <div className="nav">
                <div className="row">
                
                    <div className="col-md-2 sidenav hidden-xs" style={{'backgroundColor': 'lightblue'}}>
                        <h3 className="text-center">Dropbox</h3>
                        <ul className = "nav nav-pills nav-stacked">
                        <li><a href="/HomePage">Home</a></li>
                        </ul>
                        <ul className = "nav nav-pills nav-stacked">
                        <li><a href="">Files</a></li>
                        </ul>
                    </div>

                    <div className="col-md-8" style={{'width': '650px'}}>

                       <h2 className="text-center">Home</h2> 
                       <div>
                       <h4>Starred</h4>
                       <hr/>
                       
                          
                        
                       </div>
                       <div>
                       <h4> Recent </h4>
                       <hr />

                       
                       <RecentItemDisplay />
                       
                       </div>
                    </div>
                    <div className = "col-md-2 col-md-offset-3"  style={{'backgroundColor': 'lightblue'}}>
                    <div>
                    <br />
                    <br />
                    <br />
                      <UploadFile />
                    
                    </div>
                    </div>
            
                </div>
                </div>
            </div>

       );
    }
}


export default HomePage;

