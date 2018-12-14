import { connect } from 'react-redux';
import swal from 'sweetalert';

import {NEW_ORDER} from '../../store/actionsTypes';

import Order from './OrderUI';

// eslint-disable-next-line
import van from './images/van.png';

import './Order.scss';

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

function sweetName(str) {
  return capitalize(str.replace(/-/g, ' '));
}

const mapStateToProps = state => ({
  order: state.order
});

const mapDispatchToProps = dispatch => {
  return {
    submit: order => {
      if (!order.container) {
        swal('Oops!', 'You need to select a container!', 'error');
        return null;
      }

      if (order.scoops.length < order.minScoops) {
        swal('Oops!', 'You need to add a scoop!', 'error');
        return null;
      }

      let textOrder = `Your order:

      Container: ${sweetName(order.container.name)}`;

      for (let index = 0; index < order.scoops.length; index++) {
        const scoop = order.scoops[index];
        textOrder = `${textOrder}
        Scoop #${index + 1}: ${sweetName(scoop.name)}`;
      }

      for (let index = 0; index < order.toppings.length; index++) {
        const topping = order.toppings[index];
        textOrder = `${textOrder}
        Topping #${index + 1}: ${sweetName(topping.name)}`;
      }

      textOrder = `${textOrder}
      
      £${(order.total / 100).toFixed(2)}`;

      swal({
        text: textOrder,
        icon: 'info',
        buttons: true
      }).then(confirmed => {
        if (confirmed) {
          // swal("Your ice cream is on its way!");
          fetch(
            'https://us-central1-bw-ee-labs.cloudfunctions.net/iceCreamCreate',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                container: order.container.name,
                scoops: order.scoops.map( scoop => scoop.name),
                toppings: order.toppings.map(topping => topping.name),
                price: order.total
              })
            }
          ).then( body => body.json())
          .then(response => {
            if (response.errors.length !== 0) {
              swal('Oops!', response.errors[0].message, 'error');
            } else {
              swal({
                title: 'YAY!',
                text: `Your order number ${
                  response.order_id
                } has been succesfully submitted, it'll be on its way ASAP!`,
                icon:
                  'https://d25pgkqawum7gs.cloudfront.net/static/media/van.a304c17f.png',
                button: 'Submit another one!',
                className: 'incoming'
              }).then(() => {
                dispatch({ type: NEW_ORDER });
              });
            }
          });
        }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
