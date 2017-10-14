import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';

const headers = {
    'Accept': 'application/json'
};
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

class AboutPage extends Component {

	state = {
        description: '',
        phone : '',
        country: '',
        work: '',
        education : '',
        interests : ''
    };

	/*getAboutMe = () => {
  
        console.log("in getAboutMe");
        API.getMe()
        .then(data =>
        {
            console.log("this is in api then");
            console.log(JSON.stringify(data));
            this.setState({

                description : data[0].description,
                phone : data[0].phone,
                country: data[0].country,
                work : data[0].work,
                education : data[0].education,
                interests : data[0].interests
            });

            });
        console.log("this is state");
        console.log(this.state);
    }*/

	componentDidMount(){
       
         console.log("in getAboutMe");
        API.getMe()
        .then(data =>
        {
            console.log("this is in api then");
            console.log(JSON.stringify(data));
            this.setState({

                description : data[0].description,
                phone : data[0].phone,
                country: data[0].country,
                work : data[0].work,
                education : data[0].education,
                interests : data[0].interests
            });

            });

    }

    render() {
      console.log("i am in About");
      
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
                        <ul className = "nav nav-pills nav-stacked">
                        	<li><a href="/AboutPage">About</a></li>
                        </ul>
                    </div>
                    <div className="col-md-10">
                    
                    <table>
                    <tbody>
                    	<tr>
                    		<td>This is Me: </td>
                    		<td> {this.state.description}</td>
                    	</tr>
                    	<tr>
                    		<td>Phone: </td>
                    		<td> {this.state.phone} </td>
                    	</tr>
                    	<tr>
                    		<td>Country: </td>
                    		<td> {this.state.country} </td>
                    	</tr>
                    	<tr>
                    		<td>Work: </td>
                    		<td> {this.state.work} </td>
                    	</tr>
                    	<tr>
                    		<td>Education: </td>
                    		<td> {this.state.education}</td>
                    	</tr>
                    	<tr>
                    		<td>Interests:</td>
                    		<td>{this.state.interests}</td>
                    	</tr>
                    </tbody>
                    </table>
                    </div>
                    <div >
                        <a href='/EnterAboutYou' class="btn btn-info" role="button">Edit</a>
                    </div>
             </div>
             </div>
             </div>



        	);
    }
}

export default connect(null, null)(withRouter(AboutPage));