import {
    LOAD_DATA
} from "../actionsTypes";

const initialState = {
    containers: [],
    scoops: [],
    toppings: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA:
            {
                const {
                    containers,
                    scoops,
                    toppings
                } = action.payload;
                return {
                    ...state,
                    containers,
                    scoops,
                    toppings
                };
            }
        default:
            return state;
    }
}
