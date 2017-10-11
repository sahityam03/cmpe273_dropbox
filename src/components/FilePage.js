import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addToOrder} from "../action/index";

import FileItemDisplay from "./FileItemDisplay";
//import StarItemDisplay from "./StarItemDisplay";
//import ./App.css;


class FilePage extends Component {

    render() {
        console.log(this.props);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 sidenav hidden-xs">
                        <h3 className="text-center">Files</h3>
                        <ul className = "nav nav-pills nav-stacked">
                        <li><a href="/Home">My Files</a></li>
                        </ul>
                        <ul className = "nav nav-pills nav-stacked">
                        <li><a href="/Files">Deleted Files</a></li>
                        </ul>
                    </div>
                    <div className="col-md-8">

                       <h2 className="text-center">Home</h2> 
                       <div>
                       <h3>Dropbox</h3>
                       <hr/>
                       return(
                          <FileItemDisplay />
                        );
                       </div>
                       
                    <div className="col-md-2 sidenav hidden-xs">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                                this.props.upload(this.input.value)
                            }}
                        >Upload Files</button>
                    </div>
                </div>
            </div>  
                       
       );
    }
}

function mapStateToProps(menus) {
    console.log("map state to props : " + JSON.stringify(menus));
    const menuArr = Object.keys(menus).map((item) => (
        {
            'menu' : item,
            'price' : menus[item].price,
            'qty' : menus[item].qty
        }
    ));
    return {menuArr};
}

function mapDispatchToProps(dispatch) {
    return {
        addToOrder : (data, price) => dispatch(addToOrder(data, price))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);    // Learn 'Currying' in functional programming
 