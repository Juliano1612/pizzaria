import React from "react";
import { Container } from 'react-materialize';
import { Switch, Route } from 'react-router-dom'

import NewOrder from "./components/new_order/new_order";
import CustomizeOrder from "./components/customize_order/customize_order";

const Main = () => (
    <Container>
        <Switch>
            <Route exact path='/' component={NewOrder} />
            <Route path='/customize_order' component={CustomizeOrder} />
        </Switch>
    </Container>
);

export default Main;