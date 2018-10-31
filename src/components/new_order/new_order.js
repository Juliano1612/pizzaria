import React from "react";
import { Row,
    Col, 
    Card, 
    Collapsible, 
    CollapsibleItem,
    Button,
    Icon
} from 'react-materialize';
import $ from 'jquery'; 

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectOrder } from './../actions'; 

import MyOrder from '../my_order/my_order'

class NewOrder extends React.Component {

    state = {
        sizes : [
            {
                value: 0,
                label: 'Pequena',
                price: '20,00',
                time: 15
            },
            {
                value: 1,
                label: 'Média',
                price: '30,00',
                time: 20
            },
            {
                value: 2,
                label: 'Grande',
                price: '40,00',
                time: 25
            },
        ],

        flavours: [
            {
                value: 0,
                label: 'Calabresa',
                additionalTime: 0
            },
            {
                value: 1,
                label: 'Marguerita',
                additionalTime: 0
            },
            {
                value: 2,
                label: 'Portuguesa',
                additionalTime: '5'
            }

        ],

        selectedSize : {},
        selectedFlavour : {}
    };

    changeSelection (i, property, vector) {
        this.setState({
            [property]: this.state[vector][i]
        })
    }

    expandAll() {
        $(".collapsible-header").addClass("active");
    }

    componentDidMount(){
        this.expandAll()
    }

    render(){
        const { sizes, flavours, selectedFlavour, selectedSize } = this.state; 
        const { order, selectOrder } = this.props
        return (
            <Row>
                <Col m={8} s={12}>
                    <Collapsible popout>
                        <CollapsibleItem header='Tamanho' icon='straighten'>
                            <Row>
                                {sizes.map(s => {
                                    return (
                                        <Col m={4} s={12} key={s.value} >
                                            <Card key={s.value} className='white darken-1' textClassName='black-text' title={s.label} actions={[
                                                <Button key={s.value} 
                                                        waves='light' 
                                                        className='red'
                                                        onClick={() => {selectOrder({
                                                                            size: this.state.sizes[s.value], 
                                                                            flavour: selectedFlavour, 
                                                                            time: Object.keys(selectedFlavour).length !== 0 ? Number(selectedFlavour.additionalTime) + Number(s.time) : Number(s.time),
                                                                            value: s.price}); 
                                                                        this.changeSelection(s.value, 'selectedSize', 'sizes')} }>
                                                        Escolher
                                                </Button>]}>
                                                <Icon tiny>attach_money</Icon> {s.price}
                                                <br/><Icon tiny>timer</Icon> {s.time} minutos
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </CollapsibleItem>
                        <CollapsibleItem header='Sabor' icon='local_pizza'>
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
                                                            flavour: this.state.flavours[f.value],
                                                            time: Object.keys(selectedSize).length !== 0 ? Number(f.additionalTime) + Number(selectedSize.time) : Number(f.additionalTime),
                                                            value: selectedSize.price
                                                        });
                                                        this.changeSelection(f.value, 'selectedFlavour', 'flavours')
                                                    }}>
                                                    Escolher
                                                </Button>]}>
                                                <Icon tiny>timer</Icon> {f.additionalTime === 0 ? "Sem adicional de tempo" : `+${f.additionalTime} minutos`}  
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </CollapsibleItem>
                    </Collapsible>
                    {Object.keys(order.size).length !== 0 && Object.keys(order.flavour).length !== 0 ? 
                        <Button waves='light'
                            className='red'
                            onClick={() => {selectOrder({
                                size: selectedSize.label, 
                                flavour: selectedFlavour.label,
                                value: selectedSize.price,
                                time: Number(selectedSize.time)+Number(selectedFlavour.additionalTime),
                                 })}}>
                            Prosseguir
                        </Button> : null}
                </Col>
                <Col m={3} s={12}>
                    <MyOrder />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = store => ({
    order: store.orderState
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ selectOrder }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);