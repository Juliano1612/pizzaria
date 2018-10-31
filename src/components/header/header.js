import React from "react";
import { Navbar, Row } from 'react-materialize';
import { NavLink } from 'react-router-dom'

const Header = () => (
    <Row>
        <Navbar className="red darken-2">
            <li><NavLink to="/">Novo Pedido</NavLink></li>
            <li><NavLink to="/customize_order">Customizar Pedido</NavLink></li>
        </Navbar>
    </Row>
);

export default Header;