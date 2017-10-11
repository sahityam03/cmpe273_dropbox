import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {handleUploadFile} from "../actions/index";

//import {addToOrder} from "../action/index";
//import "./App.css";

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
            
                
                <div className="row justify-content-md-center">
                    <form encType="multipart/form-data"  onSubmit={() => this.props.handleUploadFile(this.state)}>
                      <input type="file" name= "fileUpload"  onChange={this.handleChange} />
                      <input type="submit" value="Upload" />
                    </form>
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
