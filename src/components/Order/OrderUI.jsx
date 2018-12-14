import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Price from '../Price/price';
import Name from '../SweetName/name';

class Order extends Component {
  render() {
    const listScoops = this.props.order.scoops.map((item, index) => (
      <li key={index}>
        <Name name={item.name} />
      </li>
    ));
    const listToppings = this.props.order.toppings.map((item, index) => (
      <li key={index}>
        <Name name={item.name} />
      </li>
    ));

    return (
      <section className="container with-title">
        <h2 className="title">Your order</h2>
        <div className="items">
          <p>
            <span>{this.props.order.container ? 'Container: ' : ''}</span>
            <span>
              {this.props.order.container ? (
                <Name name={this.props.order.container.name} />
              ) : (
                ''
              )}
            </span>
          </p>

          <div>
            <span>{this.props.order.scoops.length > 0 ? 'Scoops:' : ''}</span>
            <br />
            <ul>{listScoops}</ul>
          </div>
          <div>
            <span>
              {this.props.order.toppings.length > 0 ? 'Toppings:' : ''}
            </span>
            <br />
            <ul>{listToppings}</ul>
          </div>
          <div>
            <span>Total: </span>
            <Price price={this.props.order.total} showZero={true} />
          </div>
          <button
            type="button"
            className="btn is-success"
            onClick={() => {
              this.props.submit(this.props.order);
            }}
          >
            Submit your order
          </button>
        </div>
      </section>
    );
  }
}

Order.propTypes = {
  order: PropTypes.shape({
    scoops: PropTypes.array.isRequired,
    container: PropTypes.shape({
      name: PropTypes.string
    }),
    toppings: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  submit: PropTypes.func.isRequired
};

export default Order;
