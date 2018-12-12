import React, { Component } from 'react';

class Order extends Component {
  render() {
    console.log('inside render order', this.props.order);

    const listScoops = this.props.order.scoops.map(item => (
      <li key={item.name}>{item.name}</li>
    ));
    const listToppings = this.props.order.toppings.map(item => (
      <li key={item.name}>{item.name}</li>
    ));

    return (
      <div className="Order">
        <div className="categoryTitle">Order</div>
        <div className="items">
          {this.props.order.container
            ? `Container: ${this.props.order.container.name}`
            : ''}
          <br />
          <ul>{listScoops}</ul>
          <ul>{listToppings}</ul>
          {this.props.order.total}
        </div>
      </div>
    );
  }
}

export default Order;
