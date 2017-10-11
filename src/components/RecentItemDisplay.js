import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

//import {addToOrder} from "../action/index";
//import "./App.css";

class RecentItemDisplay extends Component {

    render() {

        const {item} = this.props;
        //console.log(" Props "+ JSON.stringify(this.props));
        

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-8">
                    <div style={{'width':'500px', 'height':'50px'}}>

                   <table style={{ 'width':'500px'}}>
                    <tr>
                    
                      <td style={{'width':'350px'}}>
                        ${ item.price}
                       </td>
                       <td style={{'width':'50px'}}>
                        <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                    this.props.addToOrder(item);
                                }}
                            >Share</button>
                       </td>
                       <td style={{'width':'100px'}}>
                            //options(upload, share)
                        </td>
                        </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
   return {
       addToOrder : (item) => dispatch(addToOrder(item))
    };
}

export default connect(null, mapDispatchToProps)(MenuItem);    // Learn 'Currying' in functional programming
