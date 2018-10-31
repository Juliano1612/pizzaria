import React from "react";
import { Container } from 'react-materialize';
import { Switch, Route } from 'react-router-dom'

import NewOrder from "./components/new_order/new_order";
import CustomizeOrder from "./components/customize_order/customize_order";
import ShowOrder from "./components/show_order/show_order";

const Main = () => (
    <Container>
        <Switch>
            <Route exact path='/' component={NewOrder} />
            <Route path='/customize_order' component={CustomizeOrder} />
            <Route path='/show_order' component={ShowOrder} />
        </Switch>
    </Container>
);

export default Main;