import React, {Component} from 'react';
import {connect} from 'react-redux';



import { Route, withRouter } from 'react-router-dom';
import {getAllDeletedFiles} from "../actions/index";
import { history } from '../helpers1/history1';
import * as API from '../api/API';

import  '../styles/stylessheet.css';
//import StarItemDisplay from "./StarItemDisplay";
//import ./App.css;


class Deletedfiles extends Component {

    

  componentDidMount(){
        this.props.getAllDeletedFiles();
    }

    render() {

        console.log("props "+ JSON.stringify(this.props.fileArr));
        console.log(" Props "+ JSON.stringify(this.props));
        var fArr = this.props.fileArr;
        if(fArr ==null || fArr== 'undefined')
        {
          fArr = [];
        }

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
                        <li><a href="">Deleted Files</a></li>
                        </ul>
                    </div>

                    <div className="col-md-8" style={{'width': '650px'}}>

                    <h3>Deleted Files</h3>
                
                    <div style={{'width':'500px', 'height':'50px'}}>

                    {
                      fArr.map((file,index) => {
                                    
                                    return(
                                      <div>
                                      <div >
                                      <table style={{ 'width':'875px'}}>
                                      <tbody>

                                      <tr style={{'border':'1px solid lightblue', 'width':'650px', 'height':'60px'}}>
                                      
                                      <td>
                                      <a href= "#" > {file.filename}</a>
                                      </td>
                                      
                                      </tr>
                                    </tbody>
                                    </table>
                                    </div>
                                    </div>

                                    );
                                                                         
                                })
                   }
                    
                    </div>
                  </div>
              </div>
            </div>
            

               
           
        );
    }
}
function mapStateToProps(store1) {
    console.log("map state to props : " + JSON.stringify(store1));
    console.log("this is store");
    console.log(store1);
    console.log("iam in mapstatetoprops");
    const {files} = store1;
    console.log("this is reducer2 " + JSON.stringify(files));
    const fileArr = files.deletedfiles;
  return {fileArr};
}
function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllDeletedFiles : () => dispatch(getAllDeletedFiles())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deletedfiles);    // Learn 'Currying' in functional programming
