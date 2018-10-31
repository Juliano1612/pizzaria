import { SELECT_ORDER } from './actionTypes';

export const selectOrder = value => ({
    type: SELECT_ORDER,
    size: value.size,
    flavour: value.flavour,
    additionals: value.additionals,
    value: value.value,
    time: value.time
});