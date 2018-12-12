import {
    combineReducers
} from "redux";

import icecream from './icecream';
import order from './order';

export default combineReducers({
    icecream,
    order
});