import { orderReducer, optionsReducer } from './reducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    orderState: orderReducer,
    optionsState: optionsReducer
});

