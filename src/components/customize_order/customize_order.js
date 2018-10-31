import React from "react";
import { Row, Col, Card, Input, Button } from 'react-materialize';
import MyOrder from '../my_order/my_order'

const CustomizeOrder = () => (
    <Row>
        <Col m={8} s={12}>
            <h5>CustomizeOrder</h5>
            <Card>
                <Row>
                    <Input placeholder="lorem@ipsum.com" type="email" label="Email" s={12} />
                    <Input placeholder="Lorem Ipsum..." label="Message" s={12} />
                    <Col s={12} m={12}>
                        <Button waves='light' className="right grey darken-2">SEND</Button>
                    </Col>
                </Row>
            </Card>
        </Col>
        <Col m={3} s={12}>
            <MyOrder />
        </Col>
    </Row>
);

export default CustomizeOrder;