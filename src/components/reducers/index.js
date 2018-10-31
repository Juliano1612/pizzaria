import { orderReducer } from './reducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    orderState: orderReducer
});

