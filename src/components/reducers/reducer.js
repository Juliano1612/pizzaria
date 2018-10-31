import { SELECT_ORDER } from '../actions/actionTypes';


const initialOrder = {
    size : {},
    flavour: {},
    value: 0,
    time: 0
}

export const orderReducer = (state = initialOrder, action) => {
    switch (action.type) {
        case SELECT_ORDER:
            return {
                ...state,
                size: action.size,
                flavour: action.flavour,
                value: action.value,
                time: action.time
            }
        default:
            return state;
    }
}
