import React from "react";
import { Navbar, Row } from 'react-materialize';
// import { NavLink } from 'react-router-dom'

class Header extends React.Component{

    render(){
        var logo = <img src='./pizza.png' alt="logo" />
        return (
            <Row>
                <Navbar brand={logo} className="red darken-2">
                </Navbar>
            </Row>
        );
    }
} 

export default Header;