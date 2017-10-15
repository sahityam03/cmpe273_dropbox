import React, {Component} from 'react';
import {connect} from 'react-redux';



import { Route, withRouter } from 'react-router-dom';
import {getAllFiles} from "../actions/index";
import { history } from '../helpers1/history1';
import * as API from '../api/API';

import  '../styles/stylessheet.css';
//import StarItemDisplay from "./StarItemDisplay";
//import ./App.css;


class AllFiles extends Component {

    handleDeleteFile = (id) => {
        API.changeDeleteStatus(id)
            .then((status) => {
                if (status === 201) {
                    history.push('/FilesPage');
                    this.props.getAllFiles();
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };
  

  changeStarStatus = (id) => {
    var status;
      if(document.getElementById(id).checked)
      {
        console.log("iam in if condition of starr");
        status = true;
      }
      else{
        console.log("in else condition of starr- not checked");
        status = false;
      }

        API.changeStar(id, status)
            .then((status) => {
                if (status === 201) {
                  this.props.getAllFiles();
                    history.push('/FilesPage');
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };

  componentDidMount(){
        this.props.getAllFiles();
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
            
                
                    <div style={{'width':'500px', 'height':'50px'}}>

                   
                  {
                      fArr.map((file,index) => {
                                    
                                    return(
                                      <div>
                                      <div >
                                      <table style={{ 'width':'875px'}}>
                                      <tbody>

                                      <tr style={{'border':'1px solid lightblue', 'width':'650px', 'height':'60px'}}>
                                      <td  style={{'width':'50px'}}>
                                      {file.starred == true ? 
                                      <input  className="star1" type="checkbox" id ={file.id} checked
                                      onClick = {() => { this.changeStarStatus(file.id)}} />
                                      :
                                      <input  className="star1" type="checkbox" id ={file.id}
                                      onClick = {() => { this.changeStarStatus(file.id)}} />
                                      }
                                      </td>
                                      <td style={{'width':'350px'}}>
                                      <a href= {file.filepath} download> {file.filename}</a>
                                      </td>
                                      <td>
                                      <div className="recents-item__sharing recents-item__action-button">
                                      <a className="button-secondary recents-item__share-link" href="#share">Share</a>
                                      </div>
                                      </td>
                                      <td >
                                        
                                          
                                                <button
                                                  className="btn btn-primary btn-sm"
                                                    onClick={() => {
                                                                       this.handleDeleteFile(file.id);
                                                                  }}
                                                        >Delete</button>
                                           
                                      
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
    const fileArr = files.files;
  return {fileArr};
}
function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllFiles : () => dispatch(getAllFiles())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFiles);    // Learn 'Currying' in functional programming
