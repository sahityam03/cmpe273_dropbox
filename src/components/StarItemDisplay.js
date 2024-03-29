import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {getAllStarFiles} from "../actions/index";
import { history } from '../helpers1/history1';
import * as API from '../api/API';

import  '../styles/stylessheet.css';




//import "./App.css";

class StarItemDisplay extends Component {

  

  changeStarStatus = (id) => {
    var status;
      if(document.getElementById("starred").checked)
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
                  this.props.getAllStarFiles();
                    history.push('/HomePage');
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };

  componentDidMount() {
    console.log(" Refreshing Home page");
        this.props.getAllStarFiles();
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
                                      <table style={{ 'width':'800px'}}>
                                      <tbody>

                                      <tr style={{'border':'1px solid lightblue', 'width':'650px', 'height':'60px'}}>
                                      <td style={{'width':'50px'}}>
                                      {file.starred == true ? 
                                      <input  className="star1" type="checkbox" id ="starred" checked
                                      onClick = {() => { this.changeStarStatus(file.id)}} />
                                      :
                                      <input  className="star1" type="checkbox" id ="starred"
                                      onClick = {() => { this.changeStarStatus(file.id)}} />
                                      }
                                      </td>
                                      <td style={{'width':'350px'}}>
                                      <a href= {file.filepath} download> {file.filename}</a>
                                      </td>
                                      
                                      <td style={{'width':'100px'}}>
                                      <div className="recents-item__sharing recents-item__action-button">
                                      <a className="button-secondary recents-item__share-link" 
                                      href="/Sharewith" onClick={() => {
                                            window.open('/Sharewith','_blank', 'width=400 ,height=400');
                                            
                                      }}>Share</a>
                                      </div>
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
    const fileArr = files.starfiles;
  return {fileArr};
}
function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllStarFiles : () => dispatch(getAllStarFiles())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StarItemDisplay);    // Learn 'Currying' in functional programming
