import { SELECT_ORDER } from './actionTypes';

export const selectOrder = value => ({
    type: SELECT_ORDER,
    size: value.size,
    flavour: value.flavour,
    value: value.value,
    time: value.time
});