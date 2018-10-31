import React from "react";
import { Row,
        Col,
        Card,
        Icon } from 'react-materialize';

import { connect } from 'react-redux';

class MyOrder extends React.Component {

    render() {
        const { order } = this.props;
        return (
            <Card>
                <Row className="center-align">
                    <p className="red white-text">Meu Pedido</p>
                </Row>
                <Row className="center-align">
                    {
                        Object.keys(order.size).length !== 0 ? 
                            <Col m={12} s={12} xl={12}>
                                <p><Icon tiny>straighten</Icon> Tamanho: {order.size.label}</p>
                            </Col> 
                            : null
                    }

                    {
                        Object.keys(order.flavour).length !== 0 ?
                            <Col m={12} s={12} xl={12}>
                                <p><Icon tiny>local_pizza</Icon> Sabor: {order.flavour.label}</p>
                            </Col>
                            : null
                    }

                    {
                        order.time !== undefined && Object.keys(order.size).length !== 0 ?
                            <Col m={12} s={12} xl={12}>
                                <p><Icon tiny>timer</Icon> Tempo de Preparo: {order.time} minutos</p>
                            </Col>
                            : null
                    }

                    {
                        order.value !== undefined && Object.keys(order.size).length !== 0 ?
                            <Col m={12} s={12} xl={12}>
                                <p><Icon tiny>attach_money</Icon> Valor Final: R$ {order.value}</p>
                            </Col>
                            : null
                    }
                    
                </Row>
            </Card>
        );
    }   
}

const mapStateToProps = store => ({
    order: store.orderState
});

export default connect(mapStateToProps)(MyOrder);