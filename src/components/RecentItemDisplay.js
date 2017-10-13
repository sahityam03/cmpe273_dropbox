import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {getAllFiles} from "../actions/index";


//import "./App.css";

class RecentItemDisplay extends Component {

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
                                      <table style={{ 'width':'650px'}}>
                                      <tbody>

                                      <tr style={{'border':'1px solid lightblue', 'width':'650px', 'height':'50px'}}>
                                      <td style={{'width' : '300px'}}>
                                      <a href= {file.filepath} download> {file.filename}</a>
                                      </td>
                                      </tr>
                                    </tbody>
                                    </table>
                                        

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

export default connect(mapStateToProps, mapDispatchToProps)(RecentItemDisplay);    // Learn 'Currying' in functional programming
