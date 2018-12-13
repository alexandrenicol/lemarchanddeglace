import { connect } from 'react-redux';
import {LOAD_DATA, UPDATE_RULES} from '../../store/actionsTypes';

// const Counter = ...
import Home from './HomeUI';

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => {
      fetch(
        'https://us-central1-bw-ee-labs.cloudfunctions.net/iceCreamDescribe'
      )
        .then(response => response.json())
        .then(data => {

          const containers = data.schema.properties.container.enum;
          const scoops = data.schema.properties.scoops.items.enum;
          const { maxItems, minItems } = data.schema.properties.scoops;
          const toppings = data.schema.properties.toppings.items.enum;
          const {prices} = data;

          const payload = {
            containers:[],
            scoops:[],
            toppings:[]
          }


          for (let index = 0; index < containers.length; index++) {
            const container = containers[index];
            const containerPrice = prices.containers[container];
            payload.containers.push({ name: container, price: containerPrice });
          }
          for (let index = 0; index < scoops.length; index++) {
            const scoop = scoops[index];
            const scoopPrice = prices.scoop_price;
            payload.scoops.push({ name: scoop, price: scoopPrice });
          }
          for (let index = 0; index < toppings.length; index++) {
            const topping = toppings[index];
            const toppingPrice = prices.toppings[topping];
            payload.toppings.push({
              name: topping,
              price: toppingPrice
            });
          }

          dispatch({ type: LOAD_DATA, payload });
          dispatch({ type: UPDATE_RULES, payload: {
            minItems, maxItems
          } });
        })
        .catch(error => console.log(error));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
