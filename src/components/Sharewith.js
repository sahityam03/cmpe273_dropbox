import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {getAllRecentFiles} from "../actions/index";
import { history } from '../helpers1/history1';
import * as API from '../api/API';

import  '../styles/stylessheet.css';

class Sharewith extends Component {


	render() {

			return(

					<div className="row justify-content-md-center">
					                       
                        <h3>filename</h3>
                            
                        
                        
                    <button  className="btn btn-primary btn-sm"
                          onClick={() => {
                              this.generateLink(file.id);
                                 }}
                        >Create Link</button>
                                            
                                     
                    </div>

				);

	}

}

export default Sharewith;
