import React from "react";
import { Row,
    Col, 
    Card, 
    Button,
    Icon
} from 'react-materialize';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectOrder } from './../actions'; 
import { Redirect } from 'react-router-dom'

import MyOrder from '../my_order/my_order'

class NewOrder extends React.Component {

    state = {
        selectedSize : {},
        selectedFlavour : {},
        redirect: false
    };

    changeSelection (i, property, value) {
        this.setState({
            [property]: value
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/customize_order' />
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    render(){
        const { selectedFlavour, selectedSize } = this.state; 
        const { sizes, flavours, order, selectOrder } = this.props
        return (
            <div>
                {this.renderRedirect()}
                <Row>
                    <Col m={8} s={12}>
                        <ul className="collapsible" data-collapsible="accordion">
                            <div className="collapsible-header active">
                                <i className="material-icons">straighten</i>Tamanho
                            </div>
                            <div className="collapsible-body" style={{ display: "block" }}>
                                <Row>
                                    {sizes.map(s => {
                                        return (
                                            <Col m={4} s={12} key={s.value} >
                                                <Card key={s.value} className='white darken-1' textClassName='black-text' title={s.label} actions={[
                                                    <Button key={s.value} 
                                                            waves='light' 
                                                            className='red'
                                                            onClick={() => {
                                                                selectOrder({
                                                                        size: sizes[s.value], 
                                                                        flavour: selectedFlavour,
                                                                        additionals: [],
                                                                        time: Object.keys(selectedFlavour).length !== 0 ? Number(selectedFlavour.additionalTime) + Number(s.time) : Number(s.time),
                                                                        value: s.price}); 
                                                                    this.changeSelection(s.value, 'selectedSize', s)} }>
                                                            Escolher
                                                    </Button>]}>
                                                    <Icon tiny>attach_money</Icon> {s.price}
                                                    <br/><Icon tiny>timer</Icon> {s.time} minutos
                                                </Card>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>
                            <div className="collapsible-header active">
                                <i className="material-icons">local_pizza</i>Sabor
                            </div>
                            <div className="collapsible-body" style={{ display: "block" }}>
                                <Row>
                                    {flavours.map(f => {
                                        return (
                                            <Col m={4} s={12} key={f.value} >
                                                <Card key={f.value} className='white darken-1' textClassName='black-text' title={f.label} actions={[
                                                    <Button key={f.value}
                                                        waves='light'
                                                        className='red'
                                                        onClick={() => {
                                                            selectOrder({
                                                                size: selectedSize,
                                                                flavour: flavours[f.value],
                                                                additionals: [],
                                                                time: Object.keys(selectedSize).length !== 0 ? Number(f.additionalTime) + Number(selectedSize.time) : Number(f.additionalTime),
                                                                value: selectedSize.price
                                                            });
                                                            this.changeSelection(f.value, 'selectedFlavour', f)
                                                        }}>
                                                        Escolher
                                                    </Button>]}>
                                                    + <Icon tiny>timer</Icon> {f.additionalTime === 0 ? "Sem adicional de tempo" : `${f.additionalTime} minutos`}  
                                                </Card>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>
                        </ul>
                        {Object.keys(order.size).length !== 0 && Object.keys(order.flavour).length !== 0 ? 
                            <Button waves='light'
                                className='red'
                                onClick={() => {selectOrder({
                                    size: selectedSize, 
                                    flavour: selectedFlavour,
                                    additionals: [],
                                    value: selectedSize.price,
                                    time: Number(selectedSize.time)+Number(selectedFlavour.additionalTime),
                                    }); this.setRedirect()}}>
                                Prosseguir
                            </Button> : null}
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
    sizes: store.optionsState.sizes,
    flavours: store.optionsState.flavours
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ selectOrder }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);