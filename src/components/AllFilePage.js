import React, {Component} from 'react';
import {connect} from 'react-redux';

//import {addToOrder} from "../action/index";

//import RecentItemDisplay from "./RecentItemDisplay";
//import StarItemDisplay from "./StarItemDisplay";
//import UploadFile from "./UploadFile";
//import ./App.css;


class AllFilePage extends Component {

    render() {
      console.log("i am in homepage");
        console.log(this.props);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 sidenav hidden-xs">
                        <h3 className="text-center">Dropbox</h3>
                        <h2 className="text-center">Files</h2>
                        <ul className = "nav nav-pills nav-stacked">
                        <li><a href="/HomePage">MyFiles</a></li>
                        </ul>
                        <ul className = "nav nav-pills nav-stacked">
                        <li><a href="">Sharing/a></li>
                        </ul>
                        <ul className = "nav nav-pills nav-stacked">
                        <li><a href="">Deleted Files/a></li>
                        </ul>
                    </div>
                    <div className="col-md-8">

                       <h2 className="text-center">Home</h2> 
                       <div>
                       <h4>Starred</h4>
                       <hr/>
                       
                          
                        
                       </div>
                       <div>
                       <h4> Recent </h4>
                       <hr/>
                       </div>
                    </div>
                    <div className = "col-md-2">
                    <div>
                    <br />
                    <br />
                    <br />
                      <UploadFile />
                    
                    </div>
                    </div>
            
                </div>
            </div>

       );
    }
}
export default AllFilePage;

