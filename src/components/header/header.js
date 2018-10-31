import React from "react";
import { Navbar, NavItem, Row } from 'react-materialize';

const Header = () => (
    <Row>
        <Navbar className="red darken-2">
            <NavItem href='/'>Novo Pedido</NavItem>
            <NavItem href='/customize_order'>Customizar Pedido</NavItem>
        </Navbar>
    </Row>
);

export default Header;