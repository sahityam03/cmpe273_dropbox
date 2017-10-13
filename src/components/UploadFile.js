import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {handleUploadFile} from "../actions/index";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {addToOrder} from "../action/index";
//import "./App.css";
const style = {
  margin: 12,
};

class UploadFile extends Component {
  state = {
        fileName: '',
        fileHandle: {}
    };
  /*componentWillMount(){
        this.setState({
            fileName: '',
        fileHandle: {}
        });
    }*/
 handleChange = event => {
      this.setState({fileName: event.target.files[0].name});
      this.setState({fileHandle: event.target.files[0]});
      console.log("this is length" + event.target.files.length);
  };


    render() {

        const {filedata} = this.props;
        //console.log(" Props "+ JSON.stringify(this.props));
        

        return (
            
                
                <div >
                    <span>
                      <input type="file" name= "fileUpload"  onChange={this.handleChange}  />
                      <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                    this.props.handleUploadFile(this.state);
                                }}
                            >Upload</button>
                    </span>
                    
                </div>
            
        );
    }
}

function mapDispatchToProps(dispatch) {
   return {
       handleUploadFile : (filedata) => dispatch(handleUploadFile(filedata))
    };
}

export default connect(null, mapDispatchToProps)(UploadFile);     // Learn 'Currying' in functional programming
