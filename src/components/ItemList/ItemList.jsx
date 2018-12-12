import { connect } from 'react-redux';
import {
  ADD_CONTAINER,
  ADD_SCOOP,
  ADD_TOPPING,
  REMOVE_SCOOP,
  REMOVE_TOPPING
} from '../../store/actionsTypes';
// const Counter = ...
import ItemList from './ItemListUI';

const mapStateToProps = state => ({
  icecream: state.icecream,
  order: state.order
});

const mapDispatchToProps = dispatch => {
  return {
    addItemToOrder: (category, item) => {
      console.log('addItemToOrder', category, item);
      let action = null;
      switch (category) {
        case 'containers':
          action = ADD_CONTAINER;
          break;
        case 'scoops':
          action = ADD_SCOOP;
          break;
        case 'toppings':
          action = ADD_TOPPING;
          break;
        default:
          break;
      }
      if (action) {
        dispatch({
          type: action,
          payload: item
        });
      }
    },
    removeItemFromOrder: (category, item) => {
      let action = null;
      switch (category) {
        case 'scoops':
          action = REMOVE_SCOOP;
          break;
        case 'toppings':
          action = REMOVE_TOPPING;
          break;
        default:
          break;
      }
      if (action) {
        dispatch({ type: action, payload: item });
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
