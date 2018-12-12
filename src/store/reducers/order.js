import _ from 'lodash';

import {
  ADD_CONTAINER,
  ADD_SCOOP,
  ADD_TOPPING,
  UPDATE_RULES,
  REMOVE_TOPPING,
  REMOVE_SCOOP
} from "../actionsTypes";

const initialState = {
  container: null,
  scoops: [],
  toppings: [],
  minScoops: 0,
  maxScoops: 99,
  total: 0
};

export default function (state = initialState, action) {
  console.log('order reducers', action);
  switch (action.type) {
    case ADD_CONTAINER:
      {
        let total = action.payload.price;
        state.scoops.forEach(element => {
          total += element.price
        });
        state.toppings.forEach(element => {
          total += element.price
        });
        return {
          ...state,
          container: action.payload,
          total
        };
      }
    case ADD_SCOOP:
      {
        if (state.scoops.length < state.maxScoops) {
          state.scoops.push(action.payload);
          let total = (state.container ? state.container.price : 0);
          state.toppings.forEach(element => {
            total += element.price
          });
          state.scoops.forEach(element => {
            total += element.price
          });
          return {
            ...state,
            scoops: state.scoops,
            total
          };
        }
        return state
      }
    case REMOVE_SCOOP:
      {
        const itemToRemove = _.findIndex(state.scoops, {
          name: action.payload.name
        });
        _.pullAt(state.scoops, [itemToRemove]);

        let total = (state.container ? state.container.price : 0);
        state.toppings.forEach(element => {
          total += element.price
        });
        state.scoops.forEach(element => {
          total += element.price
        });

        return { ...state,
          scoops: state.scoops,
          total
        };
      }
    case ADD_TOPPING:
      {
        state.toppings.push(action.payload);
        let total = (state.container ? state.container.price : 0);
        state.toppings.forEach(element => {
          total += element.price
        });
        state.scoops.forEach(element => {
          total += element.price
        });
        return {
          ...state,
          toppings: state.toppings,
          total
        };
      }
    case REMOVE_TOPPING:
      {
        const itemToRemove = _.findIndex(state.toppings, {
          name: action.payload.name
        });
        _.pullAt(state.toppings, [itemToRemove]);

        let total = (state.container ? state.container.price : 0);
        state.toppings.forEach(element => {
          total += element.price
        });
        state.scoops.forEach(element => {
          total += element.price
        });

        return { ...state,
          toppings: state.toppings,
          total
        };
      }
    case UPDATE_RULES:
      {
        const {
          minItems,
          maxItems
        } = action.payload;
        return {
          ...state,
          minScoops: minItems,
          maxScoops: maxItems
        };
      }
    default:
      return state;
  }
}