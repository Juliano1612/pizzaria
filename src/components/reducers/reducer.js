import { SELECT_ORDER } from '../actions/actionTypes';


const initialOrder = {
    size : {},
    flavour: {},
    additionals: [],
    value: 0,
    time: 0
}

const options = {
    sizes: [
        {
            value: 0,
            label: 'Pequena',
            price: 20.00,
            time: 15
        },
        {
            value: 1,
            label: 'Média',
            price: 30.00,
            time: 20
        },
        {
            value: 2,
            label: 'Grande',
            price: 40.00,
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
    additionals: [
        {
            value: 0,
            label: 'Extra Bacon',
            additionalTime: 0,
            additionalValue: 3.00
        },
        {
            value: 2,
            label: 'Sem cebola',
            additionalTime: 0,
            additionalValue: 0.00
        },
        {
            value: 3,
            label: 'Borda recheada',
            additionalTime: 5,
            additionalValue: 5.00
        }
    ]
}


export const orderReducer = (state = initialOrder, action) => {
    switch (action.type) {
        case SELECT_ORDER:
            return {
                ...state,
                size: action.size,
                flavour: action.flavour,
                additionals: action.additionals,
                value: action.value,
                time: action.time
            }
        default:
            return state;
    }
}

export const optionsReducer = (state = options) => {
    return state;
}

