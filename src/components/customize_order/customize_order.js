import React from "react";
import { Row, Col, Card, Icon, Button } from 'react-materialize';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectOrder } from './../actions';
import { Redirect } from 'react-router-dom'

import MyOrder from '../my_order/my_order'

class CustomizeOrder extends React.Component {

    state = {
        selectedAdditionals : [],
        redirect: false
    }

    pushAdditional(a) {
        const exists = this.state.selectedAdditionals.find(add => {
            return a.value === add.value
        })
        if( exists === undefined) {
            this.setState({
                selectedAdditionals: [...this.state.selectedAdditionals, a]
            })
        }
    }

    popAdditional(a) {
        let remove;
        let array = [...this.state.selectedAdditionals]; // make a separate copy of the array
        array.forEach( (add, index)  => {
            if (add.value === a.value) {
                remove = index;
            }
        });
        array.splice(remove, 1);
        this.setState({ selectedAdditionals: array });
    }

    finalValue(value, additionals){
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
            return <Redirect to='/show_order' />
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        const { order, additionals, selectOrder } = this.props
        const { selectedAdditionals } = this.state

        return (
            <div>
                {this.renderRedirect()}
                <Row>
                    <Col m={8} s={12}>
                        <ul className="collapsible" data-collapsible="accordion">
                            <div className="collapsible-header active">
                                <i className="material-icons">note_add</i>Adicionais
                            </div>
                            <div className="collapsible-body" style={{ display: "block" }}>
                                <Row>
                                    {additionals.map(a => {
                                        let add = selectedAdditionals.find(s => { return s.value === a.value})
                                        const button = add === undefined ?  
                                            <Button key={a.value}
                                                waves='light'
                                                className='red'
                                                onClick={() => {
                                                    this.pushAdditional(a);
                                                }}>
                                                Adicionar
                                            </Button>:
                                            <Button key={a.value}
                                                waves='light'
                                                className='green'
                                                onClick={() => {
                                                    this.popAdditional(a);
                                                }}>
                                                Remover
                                            </Button>
                                        return (
                                            <Col m={4} s={12} key={a.value} >
                                                <Card key={a.value} className='white darken-1' textClassName='black-text' title={a.label} actions={[button]}>
                                                    + <Icon tiny>attach_money</Icon> {a.additionalValue.toFixed(2)}
                                                    <br />
                                                    + <Icon tiny>timer</Icon> {a.additionalTime} minutos
                                                    </Card>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>
                        </ul>
                        <Button waves='light'
                            className='red'
                            onClick={() => {
                                selectOrder({
                                    size: order.size,
                                    flavour: order.flavour,
                                    additionals: selectedAdditionals,
                                    value: this.finalValue(order.value, selectedAdditionals),
                                    time: this.finalTime(order.time, selectedAdditionals),
                                });this.setRedirect()}}>
                            Prosseguir
                </Button>
                    </Col>
                    <Col m={3} s={12}>
                        <MyOrder />
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeOrder);