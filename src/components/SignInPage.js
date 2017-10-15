import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter, Link } from 'react-router-dom';
//import {Link} from 'react-router-link';

import {handleSubmit} from "../actions/index";
import Newpage from "./Newpage"; 
import Homepage from "./HomePage";
import SignUpPage from "./SignUpPage";
//import "./App.css";

class SignInPage extends Component {
  static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: ''
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: ''
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
                            <h1>Login</h1>
                            
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
                                label="password"
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
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSubmit(this.state)}>
                                Submit
                            </button>
                        </div>

                    </form>
                    <Link to="/SignUpPage" > Sign Up</Link>     
                </div>
           </div>
           
        );
    }
}

function mapDispatchToProps(dispatch) {
   return {
       handleSubmit : (userdata) => dispatch(handleSubmit(userdata))
    };
}

export default connect(null, mapDispatchToProps)(withRouter(SignInPage));    // Learn 'Currying' in functional programming
