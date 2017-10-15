import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';


import {handleSignUp} from "../actions/index";
//import Newpage from "./Newpage"; 
//import Homepage from "./HomePage";
//import "./App.css";

class SignUpPage extends Component {
  static propTypes = {
        handleSignUp: PropTypes.func.isRequired
    };

    state = {
        firstname: '',
        lastname : '',
        username: '',
        password: '',
        email : ''
    };

    componentWillMount(){
        this.setState({
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            email : ''
        });
    }

    render() {

        const {userdata} = this.props;
        //console.log(" Props "+ JSON.stringify(this.props));
        

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-offset-4 col-md-4">
                    <form>
                        <div className="form-group">
                            <h1>SignUp</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Firstname"
                                placeholder="Enter FirstName"
                                value={this.state.firstname}
                                onChange={(event) => {
                                    this.setState({
                                        firstname: event.target.value
                                    });
                                }} 
                              required />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Lastname"
                                placeholder="Enter LastName"
                                value={this.state.lastname}
                                onChange={(event) => {
                                    this.setState({
                                        lastname: event.target.value
                                    });
                                }} 
                              required />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }} 
                              required />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="Password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            required />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                label="Email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            required />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSignUp(this.state)}>
                                Submit
                            </button>
                        </div>
                    </form>
                         
                </div>
           </div>
           
        );
    }
}

function mapDispatchToProps(dispatch) {
   return {
       handleSignUp : (signupdata) => dispatch(handleSignUp(signupdata))
    };
}

export default connect(null, mapDispatchToProps)(withRouter(SignUpPage));    // Learn 'Currying' in functional programming
