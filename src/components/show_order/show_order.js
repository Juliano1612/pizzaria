import React from "react";
import { Row, Col, Card, Icon, Button } from 'react-materialize';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectOrder } from './../actions';
import { Redirect } from 'react-router-dom'

class ShowOrder extends React.Component {

    state = {
        selectedAdditionals: [],
        redirect: false
    }

    pushAdditional(a) {
        const exists = this.state.selectedAdditionals.find(add => {
            return a.value === add.value
        })
        if (exists === undefined) {
            this.setState({
                selectedAdditionals: [...this.state.selectedAdditionals, a]
            })
        }
    }

    popAdditional(a) {
        let remove;
        let array = [...this.state.selectedAdditionals]; // make a separate copy of the array
        array.forEach((add, index) => {
            if (add.value === a.value) {
                remove = index;
            }
        });
        array.splice(remove, 1);
        this.setState({ selectedAdditionals: array });
    }

    finalValue(value, additionals) {
        additionals.forEach(add => {
            value += add.additionalValue
        });
        return value
    }

    finalTime(time, additionals) {
        additionals.forEach(add => {
            time += add.additionalTime
        });
        return time
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        const { order, selectOrder } = this.props

        return (
            <div>
                {this.renderRedirect()}
                <Row>
                    <Col m={8} s={12}>
                        <Row>
                            <Col m={12} s={12} >
                                <Card  className='white darken-1' textClassName='black-text' title={<b>Resumo do pedido</b>} actions={[
                                        <div key={'action'}>
                                            <Icon tiny>attach_money</Icon> Valor Final:   {order.value !== undefined ? order.value.toFixed(2) : 0}
                                            <br />
                                            <Icon tiny>timer</Icon> Tempo de preparo: {order.time} minutos
                                        </div>]}>
                                    <div className="card-action">
                                        <Icon tiny>straighten</Icon> Tamanho: {order.size.label}
                                        <br/>
                                        <Icon tiny>local_pizza</Icon> Sabor: {order.flavour.label}
                                        <br />
                                        <Icon tiny>attach_money</Icon> Valor:   {order.size.price !== undefined ? order.size.price.toFixed(2) : 0}
                                    </div>
                                    {order.additionals.length !== 0? 
                                        <div className="card-action">
                                            <b>Adicionais</b>
                                            {order.additionals.map((add, index) => {
                                                return (
                                                    <div key={index}>
                                                        {add.label}: <Icon key={index} tiny>add</Icon><Icon key={`1${index}`} tiny>attach_money</Icon> {add.additionalValue.toFixed(2)}
                                                    </div>
                                                )
                                            })}
                                        </div>                                
                                    :null}
                                </Card>
                            </Col>
                        </Row>
                        <Button waves='light'
                            className='red'
                            onClick={() => {
                                selectOrder({
                                    size: {},
                                    flavour: {},
                                    additionals: [],
                                    value: 0,
                                    time: 0,
                                }); this.setRedirect()
                            }}>
                            Novo Pedido
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    order: store.orderState,
    additionals: store.optionsState.additionals
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ selectOrder }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShowOrder);